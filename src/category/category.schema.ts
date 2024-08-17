import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ImageType, ImageTypeClass } from '../@types/image.type';
import { Types } from 'mongoose';
import slugify from 'slugify';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
@ObjectType()
export class Category {
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

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  @Field(() => User, { nullable: true })
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
