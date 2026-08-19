import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  static find(arg0: (user: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Prop({ type: String, required: true })
  gender!: string;

  @Prop({ type: Number })
  phoneNumber!: number;

  @Prop({ type: Number })
  age!: number;

  @Prop({ type: String, unique: true })
  email!: string;

  @Prop({ default: Date.now })
  subStart!: Date;

  @Prop()
  subEnd!: Date;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
      },
    ],
    default: [],
  })
  expenses!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
