import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class OnlyIDParamDTO {
  @IsMongoId()
  @IsString()
  @Transform((value) => SafeMongoIdTransform(value))
  id: string;
}
export const SafeMongoIdTransform = ({ value }) => {
  try {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }
    throw new BadRequestException('Id validation fail');
  } catch (error) {
    throw new BadRequestException('Id validation fail');
  }
};
