import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@InputType()
export class GetCategoryDto {
  @IsString()
  @IsMongoId()
  @Field()
  id: string;
}
