import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { OperationIds } from '../../core/helpers/objectIds.enum';
import { CATEGORY_TAG } from '../../docs/tags';
import { CommonServerErrorResDto } from '../../dto/common.server-error.res.dto';
import { CategoryService } from './category.service';
import { ICommonCategoryResDto } from './dto/common-category-res.dto';
import { CreateCategoryReqDto } from './dto/create-category.req.dto';
import { GetAllCategoriesResDto } from './dto/get-all-categories.dto';
import { GetStatisticReqDto } from './dto/get-statistic-req.dto';
import { UpdateCategoryReqDto } from './dto/update-category-req.dto';
import { Category } from './entity/category.entity';

@ApiTags(CATEGORY_TAG)
@Controller(CATEGORY_TAG)
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  @Inject(CategoryService)
  private readonly categoryService: CategoryService;

  /**
   * / endpoint handler - create category
   * @param {CreateCategoryReqDto} body - create object
   * @returns {Promise} - Category
   */
  @Post()
  @ApiOperation({
    description: 'create category',
    operationId: OperationIds.CATEGORY_CREATE,
  })
  @ApiBody({ type: CreateCategoryReqDto })
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: ICommonCategoryResDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  create(@Body() body: CreateCategoryReqDto): Promise<Category> {
    this.logger.log(`Create category: ${body.name}`);
    return this.categoryService.createCategory(body.name);
  }

  /**
   *  endpoint handler - get all categories
   * @returns {Category[]} - { Promise<Category[]> }
   */
  @Get()
  @ApiOperation({
    description: 'get all categories',
    operationId: OperationIds.CATEGORY_GET_ALL,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: GetAllCategoriesResDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  getAllBanks(): Promise<Category[]> {
    this.logger.log(`Get all categories`);
    return this.categoryService.getAllCategories();
  }

  /**
   * endpoint handler - get one category
   * @param id - id category
   * @returns {Category} - { Category }
   */
  @Get('/:id')
  @ApiOperation({
    description: 'get one category',
    operationId: OperationIds.CATEGORY_GET_ONE,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: ICommonCategoryResDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  getCategory(@Param('id') id: number): Promise<Category> {
    this.logger.log(`Get one category with id ${id}`);
    return this.categoryService.getOneCategory(id);
  }

  /**
   * / endpoint handler - delete one category
   /  @param {id} - id category
   * @returns {Promise} - { DeleteResult }
   */
  @Delete('/:id')
  @ApiOperation({
    description: 'delete category',
    operationId: OperationIds.CATEGORY_DELETE_ONE,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  deleteCategory(@Param('id') id: number): Promise<DeleteResult> {
    this.logger.log(`Delete category with id ${id}`);
    return this.categoryService.deleteCategory(id);
  }

  /**
   * / endpoint handler - update one category
   /  @param {id} - id category
   /  @param {UpdateCategoryReqDto} - body
   * @returns {Promise<UpdateResult>}
   */
  @Patch('/:id')
  @ApiOperation({
    description: 'update category',
    operationId: OperationIds.CATEGORY_UPDATE,
  })
  @ApiResponse({
    status: 201,
    description: 'OK',
    type: UpdateCategoryReqDto,
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  updateCategory(@Body() body: UpdateCategoryReqDto, @Param('id') id: number): Promise<UpdateResult> {
    this.logger.log(`Update category with id ${id}`);
    return this.categoryService.updateCategory(id, body);
  }

  /**
   * endpoint handler - get statistic
   * @param body
   * @returns {Category} - { Category }
   */
  @Post('/get-statistic')
  @ApiOperation({
    description: 'get statistic',
    operationId: OperationIds.GET_STATISTIC,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiInternalServerErrorResponse({
    type: CommonServerErrorResDto,
    description: 'internal server error',
  })
  getInfo(@Body() body: GetStatisticReqDto): Promise<Category[]> {
    this.logger.log(`Get stat`);
    return this.categoryService.getStat(body);
  }
}
