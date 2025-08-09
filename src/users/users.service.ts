import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = this.getHashPassword(createUserDto.password);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().select('-password').lean().exec();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userModel.findOne({ _id: id });
  }

  update(updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userModel.deleteOne({ _id: id });
  }
}
