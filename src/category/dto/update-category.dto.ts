import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  addedBy?: string;
}
