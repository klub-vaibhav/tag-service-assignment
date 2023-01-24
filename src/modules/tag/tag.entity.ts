
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TagConditionDto } from "./tag.condition.dto";
import { TagTypeEnum } from "./tag.enum";

@Entity()
export class TagEntity {
    @PrimaryGeneratedColumn()
    public id: number;

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
    public condition: TagConditionDto[];

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

}
