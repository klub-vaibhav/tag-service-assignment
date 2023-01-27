import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../../app.module";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { createTag, deleteTag, getTag, getTagByFilter, updateTag } from "./tag.controller.requests";

const endpoint = '/v1/tags'

const tag1 = {
  name: "Apple",
  type: "sub-category"
}

const tag2 = {
  name: "Non-Collectible",
  type: "category",
  resourceType: "VAT",
  conditions: [
    {
      key: "regex",
      values: ["Non", "Col"],
      field: "naration"
    }
  ]
}

const tag3 = {
  name: "Apple",
  type: "sub-category",
  resourceType: "VAT"
}

const updateTagSample = {
  conditions: [
    {
      key: "regex",
      values: ["Non", "Col"],
      field: "naration"
    }
  ],
  resourceType: "GST"
}

const errorTagRequest = {
  name: null
}

const getTagFilter = {
  isResource: true,
  isStatic: false
}

describe("Tag API tests", () => {
  let app: INestApplication = null;
  beforeAll(async () => {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  })

  it(`POST ${endpoint} => should create tag`, async () => {

    const result = await createTag(tag1, app);
    expect(result.status).toEqual(201);
    expect(result.body.name).toEqual(tag1.name);
    expect(result.body.type).toEqual(tag1.type);
    expect(result.body.isDeleted).toBeFalsy();
    expect(result.body).toHaveProperty('isStatic');
    expect(result.body).toHaveProperty('resourceType');
    expect(result.body).toHaveProperty('conditions');
    expect(result.body).toHaveProperty('isResource');

  })

  it(`GET ${endpoint}/{tagID} => should return the tag with given ID`, async () => {

    const createTagResult = await createTag(tag2, app);
    expect(createTagResult.status).toEqual(201);
    expect(createTagResult.body.name).toEqual(tag2.name);
    expect(createTagResult.body.type).toEqual(tag2.type);
    expect(createTagResult.body.isDeleted).toBeFalsy();
    expect(createTagResult.body).toHaveProperty('isStatic');
    expect(createTagResult.body).toHaveProperty('resourceType');
    expect(createTagResult.body).toHaveProperty('conditions');
    expect(createTagResult.body).toHaveProperty('isResource');

    const result = await getTag(createTagResult.body.id, app);

    expect(result.status).toEqual(200);
    expect(result.body.name).toEqual(tag2.name);
    expect(result.body.type).toEqual(tag2.type);
    expect(result.body.isDeleted).toBeFalsy();
    expect(result.body).toHaveProperty('isStatic');
    expect(result.body).toHaveProperty('resourceType');
    expect(result.body).toHaveProperty('conditions');
    expect(result.body).toHaveProperty('isResource');
  })

  it(`PUT ${endpoint}/{tagID} => should update the tags with given body`, async () => {

    const createTagResult = await createTag(tag3, app);
    expect(createTagResult.status).toEqual(201);
    expect(createTagResult.body.name).toEqual(tag1.name);
    expect(createTagResult.body.type).toEqual(tag1.type);
    expect(createTagResult.body.isDeleted).toBeFalsy();
    expect(createTagResult.body).toHaveProperty('isStatic');
    expect(createTagResult.body).toHaveProperty('resourceType');
    expect(createTagResult.body).toHaveProperty('conditions');
    expect(createTagResult.body).toHaveProperty('isResource');

    const updateTagResult = await updateTag(createTagResult.body.id, updateTagSample, app);

    expect(updateTagResult.status).toEqual(200);
    expect(updateTagResult.body.name).toEqual(tag3.name);
    expect(updateTagResult.body.type).toEqual(tag3.type);
    expect(updateTagResult.body.isDeleted).toBeFalsy();
    expect(updateTagResult.body.conditions).toEqual(updateTagSample.conditions);
    expect(updateTagResult.body.resourceType).toEqual(updateTagSample.resourceType);

  } )

  it(`DELETE ${endpoint}/{tagID} => should update the isDeleted to true for given tagID`, async () => {

    const createTagResult = await createTag(tag1, app);
    expect(createTagResult.status).toEqual(201);
    expect(createTagResult.body.name).toEqual(tag1.name);
    expect(createTagResult.body.type).toEqual(tag1.type);
    expect(createTagResult.body.isDeleted).toBeFalsy();
    expect(createTagResult.body).toHaveProperty('isStatic');
    expect(createTagResult.body).toHaveProperty('resourceType');
    expect(createTagResult.body).toHaveProperty('conditions');
    expect(createTagResult.body).toHaveProperty('isResource');

    const getTagResult = await getTag(createTagResult.body.id, app);

    expect(getTagResult.status).toEqual(200);
    expect(getTagResult.body.name).toEqual(tag1.name);
    expect(getTagResult.body.type).toEqual(tag1.type);
    expect(getTagResult.body.isDeleted).toBeFalsy();
    expect(getTagResult.body).toHaveProperty('isStatic');
    expect(getTagResult.body).toHaveProperty('resourceType');
    expect(getTagResult.body).toHaveProperty('conditions');
    expect(getTagResult.body).toHaveProperty('isResource');

    const deleteTagResult = await deleteTag(getTagResult.body.id, app);

    expect(deleteTagResult.status).toEqual(200);
    expect(deleteTagResult.body.status).toEqual("success");
    expect(deleteTagResult.body.message).toEqual("Tag deleted successfully");

    const verifyDeletedTag = await getTag(getTagResult.body.id, app);

    expect(verifyDeletedTag.status).toEqual(200);
    expect(verifyDeletedTag.body).toMatchObject({});
  })

  it(`GET ${endpoint}/{tagFilter} => should return the tags with the given filter`, async () => {

    const createTagResult1 = await createTag(tag1, app);
    expect(createTagResult1.status).toEqual(201);
    expect(createTagResult1.body.name).toEqual(tag1.name);
    expect(createTagResult1.body.type).toEqual(tag1.type);
    expect(createTagResult1.body.isDeleted).toBeFalsy();
    expect(createTagResult1.body).toHaveProperty('isStatic');
    expect(createTagResult1.body).toHaveProperty('resourceType');
    expect(createTagResult1.body).toHaveProperty('conditions');
    expect(createTagResult1.body).toHaveProperty('isResource');

    const createTagResult2 = await createTag(tag2, app);
    expect(createTagResult2.status).toEqual(201);
    expect(createTagResult2.body.name).toEqual(tag2.name);
    expect(createTagResult2.body.type).toEqual(tag2.type);
    expect(createTagResult2.body.isDeleted).toBeFalsy();
    expect(createTagResult2.body).toHaveProperty('isStatic');
    expect(createTagResult2.body).toHaveProperty('resourceType');
    expect(createTagResult2.body).toHaveProperty('conditions');
    expect(createTagResult2.body).toHaveProperty('isResource');

    const createTagResult3 = await createTag(tag3, app);
    expect(createTagResult3.status).toEqual(201);
    expect(createTagResult3.body.name).toEqual(tag3.name);
    expect(createTagResult3.body.type).toEqual(tag3.type);
    expect(createTagResult3.body.isDeleted).toBeFalsy();
    expect(createTagResult3.body).toHaveProperty('isStatic');
    expect(createTagResult3.body).toHaveProperty('resourceType');
    expect(createTagResult3.body).toHaveProperty('conditions');
    expect(createTagResult3.body).toHaveProperty('isResource');

    const getTagByFilterResult = await getTagByFilter(getTagFilter.isResource, getTagFilter.isStatic, app);
    expect(getTagByFilterResult.status).toEqual(200);
    expect(getTagByFilterResult.body.message).toEqual("success");
    expect(getTagByFilterResult.body.length).toBeDefined();
    expect(getTagByFilterResult.body.data).toBeDefined();

  })

})
