import { IsString, MinLength } from "class-validator";

export class CreateRazaDto {
    @IsString()
    @MinLength(5)
    name: string
}
