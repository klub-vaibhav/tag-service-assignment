import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { CreateTagDto } from "../dto/create.tag.dto";

const endpoint = '/v1/tags';

export const createTag = async (tag: CreateTagDto, app: INestApplication) => 
    request(app.getHttpServer()).post(endpoint).send(tag).set('Accept', 'application/json');

export const getTag = async (tagID: string, app: INestApplication) => 
    request(app.getHttpServer()).get(`${endpoint}/${tagID}`).set('Accept', 'application/json');

export const updateTag = async (tagID: string, tagBody: any, app: INestApplication) => 
    request(app.getHttpServer()).put(`${endpoint}/${tagID}`).send(tagBody).set('Accept', 'application/json');

export const deleteTag = async (tagID: string, app: INestApplication) => 
    request(app.getHttpServer()).delete(`${endpoint}/${tagID}`).set('Accept', 'application/json');

export const getTagByFilter = async (isResource: boolean, isStatic: boolean, app: INestApplication) => 
    request(app.getHttpServer()).get(`${endpoint}?isResource=${isResource}&isStatic=${isStatic}`).set('Accept', 'application/jsom');
