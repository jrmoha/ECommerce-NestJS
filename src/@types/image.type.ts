import { Prop, Schema } from '@nestjs/mongoose';

export type ImageType = { public_id: string; url: string; secure_url: string };

@Schema()
export class ImageTypeClass {
  @Prop({ required: true })
  public_id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  secure_url: string;
}
