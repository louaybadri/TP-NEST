/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoDTO } from './TodoDTO';
import { UpdateTodoDTO } from './UpdateTodoDTO';
import { TodoModel } from './TodoModel';
import { TodoService } from './todo.service';
@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }
    @Get()
    getTodos(): TodoModel[] {
        return this.todoService.getTodos()
        // eslint-disable-next-line prettier/prettier
    }
    @Get(':id')
    getTodoById(@Param() param): TodoModel {
        return this.todoService.getTodoById(param.id);

    }

    @Get("delete/:id")
    deleteTodoById(@Param() param): TodoModel[] {
        return this.todoService.deleteTodoById(param.id)

    }

    @Post()
    addTodo(@Body() todoDto: TodoDTO): TodoModel[] {


        return this.todoService.addTodo(todoDto);
    }
    @Post("edit/:id")
    editTodo(@Body() updateTodo: UpdateTodoDTO, @Param() param): TodoModel[] {
        return this.todoService.editTodo(updateTodo, param)
    }
}
