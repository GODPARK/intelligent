import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeModule } from './node/node.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NodeModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/intelligent'
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
