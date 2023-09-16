import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { MonthDaysDto } from './dto/month-days.dto';
import { TaskDayDto } from './dto/task-day.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task | string> {
    const data = {
      user_id: createTaskDto.userId,
      title: createTaskDto.title,
      date_time: createTaskDto.dateTime,
      description: createTaskDto.description,
    };
    const createTask = await this.prisma.task.create({
      data,
    });
    return createTask;
  }

  async findAll() {
    const allTasks = await this.prisma.task.findMany();

    return allTasks;
  }

  async getDaysOfMonth(query: MonthDaysDto) {
    const monthDays = await this.prisma
      .$queryRaw`SELECT id, date_time AS "dateTime" FROM public."Task" 
    WHERE EXTRACT(MONTH FROM date_time) = ${parseInt(
      query.month,
    )} AND EXTRACT(YEAR FROM date_time) = ${parseInt(
      query.year,
    )} AND user_id = ${parseInt(query.userId)}`;

    return monthDays;
  }

  async getTaskByDate(query: TaskDayDto) {
    const tasks = await this.prisma.$queryRaw`SELECT * FROM public."Task"
    WHERE EXTRACT(MONTH FROM date_time) = ${parseInt(
      query.month,
    )} AND EXTRACT(YEAR FROM date_time) = ${parseInt(
      query.year,
    )} AND EXTRACT(DAY FROM date_time) = ${parseInt(
      query.day,
    )} AND user_id = ${parseInt(query.userId)}`;

    return tasks;
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
