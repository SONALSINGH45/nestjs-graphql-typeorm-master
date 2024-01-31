import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm';

@Entity({ name: 'mock' })
@ObjectType()
export class mock extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    username: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    displayName?: string;


}
