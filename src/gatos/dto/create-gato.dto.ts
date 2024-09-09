import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateGatoDto {

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsInt()
    @IsPositive()
    edad: number;

    @IsOptional()
    @IsString()
    raza?: string;
}
