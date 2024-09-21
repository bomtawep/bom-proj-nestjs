import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import { CreateUserDto } from '~/users/dto/create-user.dto';
import { HttpExceptionFilter } from '~/utilities/http-exception.filter';
import { Public, Roles } from '~/auth/auth.decorator';
import { RolesGuard } from '~/auth/roles.guard';
import { AuthGuard } from '~/auth/auth.guard';
import { Role } from '~/constants/enum';
import { QueryRunnerService } from '~/query-runner/query-runner.service';
import { VerifyUserDto } from '~/users/dto/verify-user.dto';

@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(QueryRunnerService)
    private readonly queryRunnerService: QueryRunnerService,
  ) {}



  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const q = await this.queryRunnerService.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.createUser(q, createUserDto);
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    } finally {
      await q.release()
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const q = await this.queryRunnerService.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.findOne(q, id)
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    } finally {
      await q.release()
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    const q = await this.queryRunnerService.getQueryRunner()
    await q.startTransaction()
    try {
      const users = await this.usersService.findAllUser(q)
      await q.commitTransaction()
      return users
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    } finally {
      await q.release()
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const q = await this.queryRunnerService.getQueryRunner()
    await q.startTransaction()
    try {
      const user = await this.usersService.update(q, id, updateUserDto)
      if (!user) return user
      await q.commitTransaction()
      return user
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    } finally {
      await q.release()
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const q = await this.queryRunnerService.getQueryRunner()
    await q.startTransaction()
    try {
      await this.usersService.remove(q, id)
      await q.commitTransaction()
      return id
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    } finally {
      await q.release()
    }
  }

  @Public()
  @Post('/verify')
  async findByUsername(@Body() verifyUserDto: VerifyUserDto) {
    const q = await this.queryRunnerService.getQueryRunner()
    await q.startTransaction()
    try {
      const alreadyExist = await this.usersService.verifyUsernameAndEmail(q, verifyUserDto.username, verifyUserDto.email)
      await q.commitTransaction()
      return alreadyExist
    } catch (error) {
      await q.rollbackTransaction()
      throw error
    } finally {
      await q.release()
    }
  }
}
