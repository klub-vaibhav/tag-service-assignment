import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";

export class TagConditionDto {

    @IsNotEmpty()
    @IsString()
    field: string;

    @IsNotEmpty()
    @IsString()
    key: string;

    @IsNotEmpty()
    @IsArray()
    values: string[];
}
