
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Version } from '@nestjs/common';
import { TodoDTO } from './DTO/TodoDTO';
import { UpdateTodoDTO } from './DTO/UpdateTodoDTO';
import { TodoModel } from './TodoModel';
import { TodoService } from './todo.service';
import { TodoEntity } from './Entity/todo_entity';
@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }
    @Get()
    getTodos(): TodoModel[] {
        return this.todoService.getTodos()
    }
    @Get()
    @Version("2")
    getTodosV2(@Query() param) {
        // if (param.status ) {

        // return this.todoService.getTodosByStatusV2()
        // }
        return this.todoService.getTodosV2(param)
    }
    @Get(':id')
    getTodoById(@Param() param): TodoModel {
        return this.todoService.getTodoById(param.id);

    }
    @Get(':id')
    @Version("2")
    getTodoByIdV2(@Param() param) {

        return this.todoService.getTodoByIdV2(param.id);

    }

    @Delete("delete/:id")
    deleteTodoById(@Param() param): TodoModel[] {
        return this.todoService.deleteTodoById(param.id)

    }
    @Delete("delete/:id")
    @Version('2')
    deleteTodoByIdV2(@Param() param) {
        return this.todoService.deleteTodoByIdV2(param.id)

    }
    @Put("restore/:id")
    @Version('2')
    restoreTodoByIdV2(@Param() param) {
        return this.todoService.restoreSection(param.id)

    }
    @Get("count/:status")
    @Version('2')
    countStatusV2(@Param() param) {
        return this.todoService.countStatusV2(param.status)

    }

    @Post()
    addTodo(@Body() todoDto: TodoDTO): TodoModel[] {


        return this.todoService.addTodo(todoDto);
    }
    @Post()
    @Version('2')
    addTodoV2(@Body() todoDto: TodoDTO) {


        return this.todoService.addTodoV2(todoDto);
    }
    @Post("edit/:id")
    editTodo(@Body() updateTodo: UpdateTodoDTO, @Param() param): TodoModel[] {
        return this.todoService.editTodo(updateTodo, param)
    }
    @Post("edit/:id")
    @Version("2")
    editTodoV2(@Body() updateTodo: UpdateTodoDTO, @Param() param) {
        return this.todoService.editTodoV2(updateTodo, param.id)

    }
}
function QueryParam() {
    throw new Error('Function not implemented.');
}

