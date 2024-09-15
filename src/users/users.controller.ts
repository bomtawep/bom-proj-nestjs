import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import { CreateUserDto } from '~/users/dto/create-user.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HttpExceptionFilter } from '~/utilities/http-exception.filter';
import { Public, Roles } from '~/auth/auth.decorator';
import { RolesGuard } from '~/auth/roles.guard';
import { AuthGuard } from '~/auth/auth.guard';
import { Role } from '~/constants/enum';

@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
  ) {}

  private async getQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    return queryRunner
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.createUser(q, createUserDto);
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.findOne(q, id)
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      const users = await this.usersService.findAllUser(q)
      await q.commitTransaction()
      return users
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.update(q, id, updateUserDto)
      if (!user) return user
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      await this.usersService.remove(q, id)
      await q.commitTransaction()
      return id
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }

  @Public()
  @Post('/username')
  async findByUsername(@Body() { username }: { username: string }) {
    const q = await this.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.findUserByUsername(q, username)
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    }
  }
}
