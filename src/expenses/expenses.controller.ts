import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpenseQueries } from './dtos/expenseQuery.dto';
import { IsAuthGuard } from 'src/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';

@Controller('expenses')
@UseGuards(IsAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getExpenses(
    @UserId() userId: string,
    @Query() PaginationDto: ExpenseQueries,
  ) {
    return this.expensesService.getExpenses(userId, PaginationDto);
  }

  @Get(':id')
  getById(@Param('id') id: string, @UserId() userId: string) {
    return this.expensesService.getExpenseById(id, userId);
  }

  @Post()
  createExpense(
    @UserId() userId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.createExpense(userId, createExpenseDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string, @UserId() userId: string) {
    return this.expensesService.deleteExpenseById(id, userId);
  }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseById(id, userId, updateExpenseDto);
  }
}
