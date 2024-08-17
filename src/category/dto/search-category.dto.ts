import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { OrderInput, PaginationInput } from 'src/common/dto';

@InputType()
export class SearchCategoryDto {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  @Field({ nullable: true })
  addedBy: string;

  @Field(() => OrderInput, { nullable: true })
  @IsOptional()
  order?: OrderInput;

  @Field(() => PaginationInput, { nullable: true })
  @IsOptional()
  pagination?: PaginationInput;
}
