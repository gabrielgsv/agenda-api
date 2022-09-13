import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  userId: number;

  @IsString()
  title: string;

  @IsDateString()
  dateTime: Date;

  @IsString()
  description: string;
}
