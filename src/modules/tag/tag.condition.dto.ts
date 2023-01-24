import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";

const possibleConditions = ["regex", "includes", "in", "or"];

export class TagConditionDto {

    @IsNotEmpty()
    @IsString()
    field: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(possibleConditions)
    key: string;

    @IsNotEmpty()
    @IsArray()
    value: string[];
}
