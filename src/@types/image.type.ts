import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

export type ImageType = { public_id: string; url: string; secure_url: string };

@Schema()
@ObjectType()
export class ImageTypeClass {
  @Prop({ required: true })
  @Field()
  public_id: string;

  @Prop({ required: true })
  @Field()
  url: string;

  @Prop({ required: true })
  @Field()
  secure_url: string;
}
