import { IsString } from 'class-validator';

export class TaskDayDto {
  @IsString()
  day: string;

  @IsString()
  month: string;

  @IsString()
  year: string;

  @IsString()
  userId: string;
}
