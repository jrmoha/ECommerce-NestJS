import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubCategoryService } from './sub-category.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserRole } from '../user/user.schema';
import { TrimPipe } from '../pipes/trim.pipe';
import { CreateSubCategoryDto } from './dto';

@Controller('sub-category')
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create_subCategory(
    @Req() { user }: any,
    @Body(TrimPipe) body: CreateSubCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.subCategoryService.add_subCategory(user.sub, body, image);
  }
}
