import { IsIn } from 'class-validator';
import { TodoStatusEnum } from '../TodoStatusEnum';
export class UpdateTodoDTO {
    name: string;
    description: string;
    @IsIn(Object.values(TodoStatusEnum), { message: "le status est invalide" })
    status: TodoStatusEnum
}