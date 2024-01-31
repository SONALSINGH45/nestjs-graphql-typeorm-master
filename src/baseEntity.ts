// common/entities/base.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;
    @Column()
    @Field()
    username: string;
    @Column({ type: 'timestamp' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp' })
    @Field()
    updatedAt: Date;


}
