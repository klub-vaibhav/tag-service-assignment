import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { TagConditionDto } from "./tag.condition.dto";
import { Type } from "class-transformer";

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
    condition?: TagConditionDto[];

    @IsOptional()
    @IsString()
    resourceType?: string;
    
}

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
    condition?: TagConditionDto[];

    @IsOptional()
    @IsString()
    resourceType?: string;

}

export class GetTagByFilterDto {
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    resourceType?: string;

    @IsOptional()
    @IsString()
    isDeleted?: boolean;
}
