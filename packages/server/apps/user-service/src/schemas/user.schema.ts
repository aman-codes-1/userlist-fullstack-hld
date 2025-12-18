import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTimestampsConfig } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  mobile: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: [String], required: true })
  interests: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document & SchemaTimestampsConfig;
