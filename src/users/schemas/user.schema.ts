import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
