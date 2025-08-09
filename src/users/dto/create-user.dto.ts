import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  name: string;
  phone: string;
  age: number;
  address: string;
}
