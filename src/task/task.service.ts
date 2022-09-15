import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { MonthDaysDto } from './dto/month-days.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task | string> {
    const createTask = await this.prisma.task.create({
      data: createTaskDto,
    });
    return createTask;
  }

  async findAll() {
    const allTasks = await this.prisma.task.findMany();

    return allTasks;
  }

  async getDaysOfMonth(query: MonthDaysDto) {
    const monthDays = await this.prisma.$queryRaw`SELECT id,dateTime FROM Task 
    WHERE MONTH(dateTime) = ${query.month} AND YEAR(dateTime) = ${query.year} AND userId = ${query.userId}`;

    return monthDays;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
    return `This action updates a #${id} task`;
  }

  async remove(id: number) {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return `This action removes a #${id} task`;
  }
}
