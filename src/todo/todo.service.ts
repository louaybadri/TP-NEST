/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TodoDTO } from './TodoDTO';
import { TodoModel } from './TodoModel';
import { TodoStatusEnum } from './TodoStatusEnum';
import { UpdateTodoDTO } from './UpdateTodoDTO';

@Injectable()
export class TodoService {
    private todos = [];

    @Inject('UUID') uuid: () => number;

    getHello(): string {
        return 'Hello World!';
    }
    getTodos() {
        return this.todos;
    }

    getTodoById(id: number): TodoModel {
        if (this.todos.filter((todo) => todo.id.toString() === id).length === 0) {
            throw new BadRequestException();
        } else {
            return this.todos.filter((todo) => todo.id.toString() === id)[0];
        };
    }
    addTodo(todoDto: TodoDTO): TodoModel[] {

        const modelTodo = {
            id: this.uuid(),
            name: todoDto.name,
            description: todoDto.description,
            creationDate: Date.now(),
            status: TodoStatusEnum.waiting,
        };
        this.todos.push(modelTodo);

        return this.todos;
    }

    deleteTodoById(id: number): TodoModel[] {
        const x = this.todos.filter((todo) => todo.id.toString() !== id);
        if (this.todos.filter((todo) => todo.id.toString() === id).length === 0) {
            throw new BadRequestException()
        }
        this.todos = x;
        return x;
    }
    editTodo(updateTodo: UpdateTodoDTO, param): TodoModel[] {
        const todo = this.todos.filter((todo) => todo.id.toString() === param.id)
        const index = this.todos.findIndex((todo) => todo.id.toString() === param.id)
        console.log(index);
        if (index === -1) {
            throw new BadRequestException();
        } else {
            this.todos[index]["description"] = updateTodo.description;
            this.todos[index]["name"] = updateTodo.name;
            this.todos[index]["status"] = updateTodo.status;

        }
        return this.todos;
    }

}
