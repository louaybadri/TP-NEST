import { TodoStatusEnum } from "../TodoStatusEnum";

export class SearchDTO {
    critere: string;
    status: TodoStatusEnum;
}