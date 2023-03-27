import { IsNotEmpty, MaxLength, min, MinLength } from "class-validator";

export class TodoDTO {
    @IsNotEmpty({ message: "Vous devez spécifier un titre" })
    @MinLength(3, { message: "Le Titre doit etre de longeur sup a 3" })
    @MaxLength(10, { message: "Le Titre doit etre de longeur inf a 10" })
    name: string;
    @IsNotEmpty({ message: "Vous devez spécifier la description" })
    @MinLength(10)
    description: string;
}