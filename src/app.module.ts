import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/Entity/todo_entity';
// import { ConfigService } from 'nestjs-config'

@Module({
  imports: [TodoModule, CommonModule, TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      // password: process.env.DB_PASSWORD,
      database: "tpnest",
      entities: [TodoEntity],
      synchronize: true,
      logging: true
    }
  )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
