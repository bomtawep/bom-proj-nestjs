import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '~/users/users.service';
import { QueryRunner } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(q: QueryRunner, username: string, pass: string) {
    try {
      const user = await this.usersService.findUserByUsername(q, username)
      if (user && user.password !== pass) {
        throw new HttpException('Wrong password', HttpStatus.FORBIDDEN)
      }
      const payload = { sub: user.id, username: user.username, roles: user.roles };
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } catch (error) {
      throw error
    }
  }
}
