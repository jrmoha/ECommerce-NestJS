import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ minlength: 3, maxlength: 10, required: true, trim: true })
  first_name: string;

  @Prop({ minlength: 3, maxlength: 10, required: true, trim: true })
  last_name: string;

  @Prop({
    minlength: 3,
    maxlength: 50,
    unique: true,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop()
  password_reset_code: string | undefined;

  @Prop()
  password_changed_at: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
