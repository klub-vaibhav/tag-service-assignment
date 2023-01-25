import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { TagConditionDto } from "../tag.condition.dto";

export class UpdateTagDto {

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    @Type(() => TagConditionDto)
    @ValidateNested({ each: true })
    conditions?: TagConditionDto[];

    @IsOptional()
    @IsString()
    resourceType?: string;

}
