import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpenseQueries } from './dtos/expenseQuery.dto';
import { Headers } from '@nestjs/common';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getExpenses(
    @Query('category') category: ExpenseQueries,
    @Query('priceFrom') priceFrom: ExpenseQueries,
    @Query('priceTo') priceTo: ExpenseQueries,
    @Query() PaginationDto: ExpenseQueries,
  ) {
    return this.expensesService.getExpenses(PaginationDto);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: string) {
    return this.expensesService.getExpenseById(id);
  }

  @Post()
  createExpense(
    @Headers('email') email: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.createExpense(email, createExpenseDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.expensesService.deleteExpenseById(id);
  }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseById(id, updateExpenseDto);
  }
}
