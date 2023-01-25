import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTagDto } from "./dto/create.tag.dto";
import { UpdateTagDto } from "./dto/update.tag.dto";
import { GetTagByFilterDto } from "./dto/filter.tag.dto";

@Controller('v1/tags')

export class TagController {

    constructor(private readonly tagService: TagService) {}

    @Post()
    async createTag(@Body() createTag: CreateTagDto) {
        return await this.tagService.createTag(createTag);
    }

    @Get(':id')
    async getTagByID(@Param('id') tagID: string) {
        return this.tagService.getTagByID(tagID);
    }

    @Delete(':id')
    async deleteTagByID(@Param('id') tagID: string) {
        return this.tagService.deleteTagByID(tagID);
    }

    @Put(':id')
    async updateTagByID(
        @Param('id') tagID: string,
        @Body() updateTagBody: UpdateTagDto
    ) {
        return this.tagService.updateTagByID(tagID, updateTagBody);
    }

    @Get()
    async getTagsByFilter(@Query() tagFilter: GetTagByFilterDto) {
        return this.tagService.fetchTagByFilter(tagFilter);
    }
}
