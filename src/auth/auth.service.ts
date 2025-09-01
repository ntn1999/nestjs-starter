import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const isValidPassword = this.usersService.isValidPassword(
      pass,
      user.password,
    );
    if (isValidPassword) {
      return user;
    }
    return null;
  }
}
