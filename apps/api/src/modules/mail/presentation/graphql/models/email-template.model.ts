import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailTemplateModel {
  @Field(() => Int)
  id: number;

  @Field()
  templateCode: string;

  @Field()
  subject: string;

  @Field()
  templateText: string;

  @Field({ nullable: true })
  style?: string;

  @Field()
  originalTemplateCode: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
