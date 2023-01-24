import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateTagDto, GetTagByFilterDto, UpdateTagDto } from "./tag.dto";
import { TagService } from "./tag.service";

@Controller()

export class TagController {

    constructor(private readonly tagService: TagService) {}

    @Post('tag')
    async createTag(@Body() createTag: CreateTagDto) {
        return await this.tagService.createTag(createTag);
    }

    @Get('tag/:id')
    async getTagByID(@Param('id') tagID: string) {
        return this.tagService.getTagByID(Number(tagID));
    }

    @Delete('tag/:id')
    async deleteTagByID(@Param('id') tagID: string) {
        return this.tagService.deleteTagByID(Number(tagID));
    }

    @Put('tag/:id')
    async updateTagByID(
        @Param('id') tagID: string,
        @Body() updateTagBody: UpdateTagDto
    ) {
        return this.tagService.updateTagByID(Number(tagID), updateTagBody);
    }

    @Get('tags')
    async getTagsByFilter(@Query() tagFilter: GetTagByFilterDto) {
        return this.tagService.fetchTagByFilter(tagFilter);
    }
}
