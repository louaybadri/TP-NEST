import { TodoStatusEnum } from './TodoStatusEnum';
export class TodoModel {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  status: TodoStatusEnum;


}
