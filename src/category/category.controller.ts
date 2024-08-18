import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { TrimPipe } from '../pipes/trim.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UserRole } from '../user/user.schema';
import { OnlyIDParamDTO } from '../common/dto';

@Controller('category')
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async add_category(
    @Req() { user }: any,
    @Body(TrimPipe) createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.add_category(user.sub, createCategoryDto, file);
  }

  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async update_category(
    @Param() { id }: OnlyIDParamDTO,
    @Body(TrimPipe) updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.update_category(id, updateCategoryDto, file);
  }
}
