import { IsOptional, IsString } from "class-validator";

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
