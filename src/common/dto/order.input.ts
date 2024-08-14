import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderInput {
  @Field({ nullable: true })
  orderBy?: string;

  @Field({ nullable: true })
  orderDirection?: 'ASC' | 'DESC';
}
