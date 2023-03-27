
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoDTO } from './DTO/TodoDTO';
import { TodoModel } from './TodoModel';
import { TodoStatusEnum } from './TodoStatusEnum';
import { UpdateTodoDTO } from './DTO/UpdateTodoDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './Entity/todo_entity';
import { Like, Repository } from 'typeorm';
import { SearchDTO } from './DTO/SearchDTO';

@Injectable()
export class TodoService {


    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>) { }




    async countStatusV2(status: any) {
        return await this.todoRepository.count({ where: { status: status } })
        // throw new Error('Method not implemented.');
    }
    async editTodoV2(updateTodo: UpdateTodoDTO, id: number) {
        return await this.todoRepository.update(id, { ...updateTodo })

        // console.log("fi9 ya salma");

    }
    private todos = [];
    async addTodoV2(todoDto: TodoDTO) {
        // console.log("it is working");

        return await this.todoRepository.save(todoDto);
        // throw new Error('Method not implemented.');
    }

    @Inject('UUID') uuid: () => number;

    getHello(): string {
        return 'Hello World!';
    }
    getTodos() {
        return this.todos;
    }
    async getTodosV2(conditions: SearchDTO) {
        // let result;
        if (conditions.status || conditions.critere) {
            return await this.todoRepository.find({ where: [{ name: Like(`%${conditions.critere}%`) }, { description: Like(`%${conditions.critere}%`) }, { status: conditions.status }] });
        }
        return await this.todoRepository.find();
    }

    getTodoById(id: number): TodoModel {
        if (this.todos.filter((todo) => todo.id.toString() === id).length === 0) {
            throw new BadRequestException();
        } else {
            return this.todos.filter((todo) => todo.id.toString() === id)[0];
        }
    }
    async getTodoByIdV2(id: number) {
        if ((await this.todoRepository.find({ where: { id: id } })).length === 0) {
            throw new NotFoundException()
        }
        return this.todoRepository.find({ where: { id: id } })
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
    async deleteTodoByIdV2(id: number) {
        // console.log("working");

        return this.todoRepository.softDelete(id)
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


    async restoreSection(id: number) {
        return await this.todoRepository.restore(id);
    }

}
