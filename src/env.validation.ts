import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  MONGO_URI: string;

  @IsString()
  ACCESS_TOKEN_PRIVATE_KEY: string;

  @IsString()
  ACCESS_TOKEN_PUBLIC_KEY: string;

  @IsString()
  REFRESH_TOKEN_PRIVATE_KEY: string;

  @IsString()
  REFRESH_TOKEN_PUBLIC_KEY: string;

  @IsString()
  CLOUDINARY_NAME: string;

  @IsString()
  CLOUDINARY_API_KEY: string;

  @IsString()
  CLOUDINARY_API_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
