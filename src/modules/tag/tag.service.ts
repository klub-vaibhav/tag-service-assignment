import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { Repository } from "typeorm";
import { CreateTagDto, GetTagByFilterDto, UpdateTagDto } from "./tag.dto";
import {v4 as uuidv4} from 'uuid';

@Injectable()

export class TagService {

    constructor(
        @InjectRepository(TagEntity) 
        private tagRepository: Repository<TagEntity>
    ) {}

    generateKey(name: string): string {
        return name.toLowerCase().split(" ").join("-") + "-" + uuidv4();
    }

    async createTag(createTag: CreateTagDto): Promise<any> {

        const keyId = this.generateKey(createTag.name);

        const createTagData: any = {
            name        : createTag.name,
            type        : createTag.type,
            key         : keyId,
            condition   : createTag.condition,
            isStatic    : (!createTag?.condition?.length) ? true : false
        }
        if(createTag?.resourceType?.length) {
            createTagData.isResource = true;
            createTagData.resourceType = createTag.resourceType;
        }

        const newTag = this.tagRepository.create(createTagData);
        return this.tagRepository.save(newTag);
    }

    async getTagByID(tagID: number): Promise<any> {
        const tagDetails = await this.tagRepository.find({
            where: {
                id: tagID
            }
        })
        return {...tagDetails[0]};
    }

    async deleteTagByID(tagID: number): Promise<{
        status: string,
        message: string
    }> {
        const deleteTagDetails = await this.tagRepository.update({
            id: tagID,
            isDeleted: false
        }, {
            isDeleted: true,
            deletedAt: new Date()
        });

        if(!deleteTagDetails.affected) throw new NotFoundException('Tag ID not found');
        return {
            status: 'success',
            message: 'Tag deleted successfully'
        }
    }

    async updateTagByID(tagID: number, updateTagBody: UpdateTagDto) {
        const updateTagData: any = {};

        if(updateTagBody?.resourceType?.length) {
            updateTagData.resourceType = updateTagBody.resourceType;
        } else {
            updateTagData.isResource = false;
            updateTagData.resourceType = null;
        }

        if(updateTagBody?.condition?.length) {
            updateTagData.condition = updateTagBody.condition;
            updateTagData.isStatic = false;
        } else {
            updateTagData.condition = [];
            updateTagData.isStatic = true;
        }

        if(updateTagBody.type) {
            updateTagData.type = updateTagBody.type;
        }

        const updatedTagResult = await this.tagRepository.update({
            id: tagID,
            isDeleted: false
        }, {
           ...updateTagData 
        })

        if(!updatedTagResult.affected) throw new NotFoundException('Tag not found');

        const updatedTag = await this.tagRepository.find({
            where: {
                id: tagID
            }
        });

        return {...updatedTag[0]};
    }

    async fetchTagByFilter(tagFilter): Promise<any> {

        const filteredTagData = await this.tagRepository.find({
            where: {
                ...tagFilter
            }
        })

        return [...filteredTagData]
    }

}
