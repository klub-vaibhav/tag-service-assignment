import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "./tag.entity";
import { Repository } from "typeorm";
import {v4 as uuidv4} from 'uuid';
import { CreateTagDto } from "./dto/create.tag.dto";
import { UpdateTagDto } from "./dto/update.tag.dto";

@Injectable()

export class TagService {

    constructor(
        @InjectRepository(TagEntity) 
        private tagRepository: Repository<TagEntity>
    ) {}

    generateKey(name: string): string {
        return name.toLowerCase().split(" ").join("-") + "-" + Math.random().toString(36).substr(2, 5);
    }

    async createTag(createTag: CreateTagDto): Promise<any> {

        const keyId = this.generateKey(createTag.name);

        const createTagData: any = {
            id          : uuidv4(),
            name        : createTag.name,
            type        : createTag.type,
            key         : keyId,
            condition   : createTag.conditions,
            isStatic    : (!createTag?.conditions?.length) ? true : false
        }
        if(createTag?.resourceType?.length) {
            createTagData.isResource = true;
            createTagData.resourceType = createTag.resourceType;
        }

        const newTag = this.tagRepository.create(createTagData);
        return this.tagRepository.save(newTag);
    }

    async getTagByID(tagID: string): Promise<any> {
        const tagDetails = await this.tagRepository.find({
            where: {
                id       : tagID,
                isDeleted: false
            }
        })
        return {...tagDetails[0]};
    }

    async deleteTagByID(tagID: string): Promise<{
        status: string,
        message: string
    }> {
        const deleteTagDetails = await this.tagRepository.update({
            id       : tagID,
            isDeleted: false
        }, {
            isDeleted: true,
            deletedAt: new Date(),
            deletedBy: "User"
        });

        if(!deleteTagDetails.affected) throw new NotFoundException('Tag ID not found');
        return {
            status: 'success',
            message: 'Tag deleted successfully'
        }
    }

    async updateTagByID(tagID: string, updateTagBody: UpdateTagDto) {
        const updateTagData: any = {};

        if(updateTagBody?.resourceType?.length) {
            updateTagData.resourceType = updateTagBody.resourceType;
        } else {
            updateTagData.isResource = false;
            updateTagData.resourceType = null;
        }

        if(updateTagBody?.conditions?.length) {
            updateTagData.condition = updateTagBody.conditions;
            updateTagData.isStatic = false;
        } else {
            updateTagData.condition = [];
            updateTagData.isStatic = true;
        }

        if(updateTagBody.type) {
            updateTagData.type = updateTagBody.type;
        }

        const updatedTagResult = await this.tagRepository.update({
            id       : tagID,
            isDeleted: false
        }, {
           ...updateTagData,
           updatedBy: "User"
        })

        if(!updatedTagResult.affected) throw new NotFoundException('Tag not found');

        const updatedTag = await this.tagRepository.find({
            where: {
                id       : tagID,
                isDeleted: false
            }
        });

        return {...updatedTag[0]};
    }

    async fetchTagByFilter(tagFilter): Promise<any> {

        const filteredTagData = await this.tagRepository.find({
            where: {
                ...tagFilter,
                isDeleted: false
            }
        })

        return {
            message: 'success',
            length: filteredTagData.length,
            data: [...filteredTagData]
        }
    }

}
