import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm';

@Entity({ name: 'testing2' })
@ObjectType()
export class testinggg extends BaseEntity {
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
