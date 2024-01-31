import { PrimaryColumn, Column, Entity } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from 'src/baseEntity';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting extends BaseEntity {

    @PrimaryColumn()
    @Field((type) => Int)
    userId: number;

    @Column({ default: false })
    @Field({ defaultValue: false })
    receiveNotifications: boolean;

    @Column({ default: false })
    @Field({ defaultValue: false })
    receiveEmails: boolean;
}


