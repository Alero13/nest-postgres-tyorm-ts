import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsEmail()
    email: string;

    @Transform( ({ value }) => value.trim() )
    @IsString()
    @MinLength(6)
    contraseña: string;
}