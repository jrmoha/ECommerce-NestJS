import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { ImageType, ImageTypeClass } from '../@types/image.type';
import { Category } from '../category/category.schema';
import { User } from '../user/user.schema';

@Schema({ timestamps: true })
@ObjectType()
export class SubCategory {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  @Field()
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  @Field()
  slug: string;

  @Prop({ type: ImageTypeClass, required: true })
  @Field(() => ImageTypeClass)
  image: ImageType;

  @Prop({ type: Types.ObjectId, ref: 'category', required: true })
  @Field(() => Category)
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  @Field(() => User)
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
