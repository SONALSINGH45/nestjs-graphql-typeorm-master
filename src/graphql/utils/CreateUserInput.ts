import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;
}
@InputType()
export class updateUserInput {
  @Field()
  id: number;
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName?: string;
}
