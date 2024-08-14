import { OrderInput } from './../../common/dto/order.input';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from 'src/common/dto/pagination.input';

@InputType()
export class SearchUserDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field(() => OrderInput, { nullable: true })
  @IsOptional()
  order?: OrderInput;

  @Field(() => PaginationInput, { nullable: true })
  @IsOptional()
  pagination?: PaginationInput;
}
