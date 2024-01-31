import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,

} from 'typeorm';
import { UserSetting } from "./userSetting.entity";
import { BaseEntity } from 'src/baseEntity';


@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    username: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    displayName?: string;

    @OneToOne(() => UserSetting)
    @JoinColumn()
    @Field({ nullable: true })
    settings?: UserSetting;
}
