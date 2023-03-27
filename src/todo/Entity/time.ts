import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class Time {
    @CreateDateColumn({ update: false })
    creation_date: Date;
    @UpdateDateColumn()
    update_date: Date;
    @DeleteDateColumn()
    delete_date: Date;
}