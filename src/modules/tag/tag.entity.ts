
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { TagConditionDto } from "./tag.condition.dto";
import { TagTypeEnum } from "./tag.enum";
import { IsString, IsUUID } from "class-validator";

@Entity()
export class TagEntity {

    @PrimaryColumn()
    @IsUUID()
    @IsString()
    public id: string;

    @Column()
    public name: string;

    @Column({
        type: 'enum',
        enum: TagTypeEnum,
        default: TagTypeEnum.CATEGORY
    })
    public type: TagTypeEnum;

    @Column()
    public key: string;

    @Column('json', { default: [] })
    public conditions: TagConditionDto[];

    @Column({
        nullable: true
    })
    public isStatic: boolean;

    @Column({
        default: false
    })
    public isResource: boolean;

    @Column({
        nullable: true
    })
    public resourceType: string;

    @Column({
        default: false
    })
    public isDeleted: boolean;

    @CreateDateColumn({
        type: 'timestamp'
    })
    public createdAt: Date;

    @UpdateDateColumn({
        nullable: true
    })
    public updatedAt: Date;

    @Column({
        nullable: true
    })
    public deletedAt: Date;

    @Column({
        default: 'User'
    })
    public createdBy: string;

    @Column({
        nullable: true
    })
    public updatedBy: string;

    @Column({
        nullable: true
    })
    public deletedBy: string;

}
