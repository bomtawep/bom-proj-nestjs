import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '~/users/dto/create-user.dto';
import { QueryRunner } from 'typeorm';
import { User } from '~/entities/users.entity';
import { UserResponseDto } from '~/users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { ErrorException } from '~/utilities/http-exception';

const { AlreadyExists, NotFound } = ErrorException()

@Injectable()
export class UsersService {
  constructor() {}

  async createUser(q: QueryRunner, createUserDto: CreateUserDto) {
    const isAlreadyExist = await this.checkUserExist(q, createUserDto.username, createUserDto.email)
    if (isAlreadyExist) throw AlreadyExists

    const createdUser = await q.manager.save(User, createUserDto)
    const user = await this.findOne(q, createdUser.id)
    if(!user) throw NotFound

    return plainToInstance(UserResponseDto, user)
  }

  async findOne(q: QueryRunner, id: string) {
    const user = await q.manager.findOne(
      User,
      { where: { id: id } }
    );
    if(!user) throw NotFound

    return plainToInstance(UserResponseDto, user)
  }

  async findAllUser(q: QueryRunner) {
    const users = await q.manager.find(User);
    return plainToInstance(UserResponseDto, users);
  }

  async update(q: QueryRunner, id: string, updateUserDto: CreateUserDto) {
    let user: UserResponseDto

    const isAlreadyExist = await this.checkUserExist(q, updateUserDto.username, updateUserDto.email)
    if(isAlreadyExist) throw AlreadyExists

    await q.manager.update(User, id, updateUserDto)
    user = await this.findOne(q, id)
    if(!user) throw NotFound

    return user
  }

  async remove(q: QueryRunner, id: string) {
    const user = await this.findOne(q, id)
    if(!user) throw NotFound

    return q.manager.delete(User, id)
  }

  async findUserByUsername(q: QueryRunner, username: string) {
    const user = await q.manager.findOne(User, { where: { username: username } })
    if (!user) throw NotFound
    return user
  }

  async findUserByUserId(q: QueryRunner, userId: string) {
    const user = await q.manager.findOne(User, { where: { id: userId } })
    if (!user) throw NotFound
    return user
  }

  checkUserExist(q: QueryRunner, username: string, email: string) {
    return q.manager.findOne(User, { where: { username: username, email: email } })
  }
}
