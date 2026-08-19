import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Expense {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({ type: String, required: true })
  productName!: string;

  @Prop({ type: String, required: true })
  category!: string;

  @Prop({ type: Number })
  quantity!: number;

  @Prop({ type: Number })
  price!: number;

  @Prop()
  totalPrice!: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
