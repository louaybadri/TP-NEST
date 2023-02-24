import { TodoStatusEnum } from './TodoStatusEnum';
export class UpdateTodoDTO {
    name: string;
    description: string;
    status: TodoStatusEnum
}