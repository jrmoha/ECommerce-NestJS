import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ImageType, ImageTypeClass } from '../@types/image.type';

enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: true, trim: true })
  first_name: string;

  @Prop({ required: true, trim: true })
  last_name: string;

  @Prop({ unique: true, required: true, trim: true })
  username: string;

  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({})
  password_changed_at: Date;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop()
  password_reset_code: string | undefined;

  @Prop()
  password_reset_at: Date;

  @Prop({ type: ImageTypeClass })
  profile_image: ImageType;

  compare_password: (candidate_password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  return next();
});

UserSchema.methods.compare_password = function (
  candidate_password: string,
): Promise<boolean> {
  return bcrypt.compare(candidate_password, this.password);
};
