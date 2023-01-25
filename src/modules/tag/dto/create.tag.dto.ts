import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TagConditionDto } from "../tag.condition.dto";

export class CreateTagDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsArray()
    @Type(() => TagConditionDto)
    @ValidateNested({ each: true })
    conditions?: TagConditionDto[];

    @IsOptional()
    @IsString()
    resourceType?: string;
    
}
