import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImageType, ImageTypeClass } from '../@types/image.type';
import { Types } from 'mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  slug: string;

  @Prop({ type: ImageTypeClass, required: true })
  image: ImageType;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  addedBy: string;

  @Prop({ required: true })
  custom_id: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = slugify(this.name);

  return next();
});
