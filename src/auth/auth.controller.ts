import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '~/utilities/http-exception.filter';
import { AuthService } from '~/auth/auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '~/entities/users.entity';
import { Public, Roles } from '~/auth/auth.decorator';
import { UsersService } from '~/users/users.service';
import { RolesGuard } from '~/auth/roles.guard';
import { Role } from '~/constants/enum';

@UseFilters(HttpExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  private async getQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    return queryRunner
  }

  @Public()
  @Post('/sign-in')
  async signIn(@Body() { username, password }: { username: string, password: string }) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.authService.verifyUser(q, username, password);
      await q.commitTransaction()
      return user;
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('/session')
  async getSession(
    @Request() req: any
  ) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    const { user } = req
    try {
      const session = await this.usersService.findUserByUserId(q, user.id)
      await q.commitTransaction()
      return session;
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @Public()
  @Post('/sign-up')
  async signUp(@Body() createUserDto: User) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.createUser(q, createUserDto)
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @Get('/profile')
  async getProfile(@Body() req: User) {
    return 'profile'
  }
}
