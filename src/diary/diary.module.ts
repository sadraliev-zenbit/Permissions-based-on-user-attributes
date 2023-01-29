import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  providers: [DiaryService],
  controllers: [DiaryController],
})
export class DiaryModule {}
