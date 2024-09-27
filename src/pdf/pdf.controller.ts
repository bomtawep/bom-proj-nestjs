import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import * as pdfFonts from 'pdfmake-thai/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { AuthGuard } from '~/auth/auth.guard';
import { RolesGuard } from '~/auth/roles.guard';
import { Roles } from '~/auth/auth.decorator';
import { Role } from '~/constants/enum';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { ProductTypeDto } from '~/product-type/dto/product-type.dto';

// @ts-ignore
pdfMake.vfs = pdfFonts.pdfMake.vfs
// @ts-ignore
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf',
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
};

@Controller('pdf')
export class PdfController {

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('/pdf-make')
  async createPdf() {

    const content: Content[] = [];

    content.push({
      text: 'Hello World',
      style: 'header',
      alignment: 'center',
    });

    // Push content with table
    content.push({
      table: {
        widths: ['*', '*'],
        body: [
          ['First', 'Second'],
          ['Third', 'Fourth'],
        ],
      },
    });

    // Create bottom content
    content.push({
      text: 'Footer',
      style: 'footer',
      alignment: 'center',
    });


    const docDefinition: TDocumentDefinitions = {
      content,
      pageMargins: [60, 60, 60, 0],
      defaultStyle: {
        font: 'THSarabunNew',
        fontSize: 14,
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    const buffer = new Promise((resolve) => {
      pdfDoc.getBuffer(resolve);
    });

    // buffer to pdf file
    return this.savePdf(await buffer)
  }

  @Post('/puppeteer')
  async createPuppeteerPdf(@Body() data: ProductTypeDto) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlFilePath = path.join(__dirname, '../../src/pdf/template/product-type.html');

    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // await page.goto('http://localhost:3009/');

    // Replace content in html all row
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const placeholder = `\${${key}}`;
        htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), data[key]);
      }
    }

    await page.setContent(htmlContent);
    await page.setViewport({ width: 1080, height: 1024 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    const filePath = path.join(__dirname, `../../public/pdf/${Date.now()}.pdf`);
    fs.writeFileSync(filePath, pdfBuffer);

    return filePath;
  }

  private savePdf(buffer: unknown) {

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, `../../public/pdf/${Date.now()}.pdf`);
    fs.writeFileSync(filePath, buffer);
    return filePath
  }
}
