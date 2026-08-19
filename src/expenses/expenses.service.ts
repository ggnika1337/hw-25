import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schemas/expense.schema';
import { User } from 'src/users/schemas/user.schema';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpenseQueries } from './dtos/expenseQuery.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<Expense>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getExpenses({
    category,
    priceFrom,
    priceTo,
    page,
    take,
  }: ExpenseQueries): Promise<Expense[]> {
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (priceFrom !== undefined) {
      filter.price = {
        ...filter.price,
        $gte: priceFrom,
      };
    }

    if (priceTo !== undefined) {
      filter.price = {
        ...filter.price,
        $lte: priceTo,
      };
    }

    const skip = (page - 1) * take;

    return await this.expenseModel.find(filter).skip(skip).limit(take);
  }

  async createExpense(email: string, dto: CreateExpenseDto): Promise<Expense> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const expense = await this.expenseModel.create({
      ...dto,
      totalPrice: dto.quantity * dto.price,
      owner: user._id,
    });

    await this.userModel.findByIdAndUpdate(user._id, {
      $push: {
        expenses: expense._id,
      },
    });

    return expense;
  }

  async getExpenseById(expenseId: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(expenseId);

    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    return expense;
  }

  async deleteExpenseById(expenseId: string): Promise<Expense> {
    const expense = await this.expenseModel.findByIdAndDelete(expenseId);

    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    await this.userModel.findByIdAndUpdate(expense.owner, {
      $pull: {
        expenses: expense._id,
      },
    });

    return expense;
  }

  async updateExpenseById(
    expenseId: string,
    dto: UpdateExpenseDto,
  ): Promise<Expense> {
    const expense = await this.expenseModel.findById(expenseId);

    if (!expense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    const quantity = dto.quantity ?? expense.quantity;
    const price = dto.price ?? expense.price;

    const updatedExpense = await this.expenseModel.findByIdAndUpdate(
      expenseId,
      {
        $set: {
          ...dto,
          totalPrice: quantity * price,
        },
      },
      {
        new: true,
      },
    );

    if (!updatedExpense) {
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }

    return updatedExpense;
  }
}
