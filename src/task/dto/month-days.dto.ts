import { IsString } from 'class-validator';

export class MonthDaysDto {
  @IsString()
  month: string;

  @IsString()
  year: string;

  @IsString()
  userId: string;
}
