import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { ImageType, ImageTypeClass } from 'src/@types/image.type';

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  slug: string;

  @Prop({ type: ImageTypeClass, required: true })
  image: ImageType;

  @Prop({ type: Types.ObjectId, ref: 'category', required: true })
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  addedBy: string;

  @Prop({ required: true })
  custom_id: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
SubCategorySchema.index({ name: 1 });

SubCategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = slugify(this.name);

  return next();
});
