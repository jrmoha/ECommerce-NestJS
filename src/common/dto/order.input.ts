import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class OrderInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  orderBy?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsEnum(['ascending', 'descending', 'asc', 'desc'])
  orderDirection?: 'ascending' | 'descending' | 'asc' | 'desc';
}
