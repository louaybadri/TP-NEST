import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from '../TodoStatusEnum';
import { Time } from './time';
@Entity("todo")
export class TodoEntity extends Time {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    @Column({ length: 10 })
    name: string;
    @Column()
    description: string;
    @Column({ enum: TodoStatusEnum, type: 'enum', default: TodoStatusEnum.waiting })
    status: TodoStatusEnum;

}