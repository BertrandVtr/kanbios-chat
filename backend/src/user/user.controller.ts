import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { GetEntityPipe } from './pipes/get-entity.pipe';
import { User } from './user.entity';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { Not } from 'typeorm';
import { ContextAwareInterceptor } from '../utils/context-aware.interceptor';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ContextAwareInterceptor)
@ApiBearerAuth()
@ApiTags('Utilisateurs')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Bearer token absent ou invalide',
})
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'Liste les utilisateurs' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Numéro de la page de résultats (default : 1)',
    default: 1,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Nombre de résultats par page (default : 50)',
    default: 50,
    example: 20,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste les utilisateurs récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          description: 'Liste des utilisateurs',
          items: { $ref: getSchemaPath(User) },
        },
        total: {
          type: 'number',
          example: 50,
          description: "Nombre total d'utilisateurs",
        },
        currentPage: {
          type: 'number',
          example: 1,
          description: 'Page actuelle de la liste',
        },
        lastPage: {
          type: 'number',
          example: 10,
          description: 'Dernière page de la liste',
        },
        limit: {
          type: 'number',
          example: 50,
          description: "Nombre d'utilisateurs par page",
        },
      },
    },
  })
  public async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
    @AuthUser() authUser: User,
  ) {
    return await this.userService.findAllWithPagination(page, limit, {
      id: Not(authUser.id),
    });
  }

  @Post('/')
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "L'utilisateur a été créé avec succès",
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'La validation des champs a échoué',
  })
  public async create(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.create(userCreateDto);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lis un seul utilisateur' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    required: true,
    description: "id de l'utilisateur à retourner",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "L'utilisateur est retourné avec succès",
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "L'utilisateur demandé n'existe pas",
  })
  public async getOne(@Param('id', GetEntityPipe()) user: User) {
    return user;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Modifier un utilisateur' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    required: true,
    description: "id de l'utilisateur à retourner",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "L'utilisateur a été modifé avec succès",
    type: User,
  })
  public async update(
    @Param('id', GetEntityPipe()) user: User,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return await this.userService.update(user.id, userUpdateDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    required: true,
    description: "id de l'utilisateur à retourner",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "L'utilisateur est retourné avec succès",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "L'utilisateur demandé n'existe pas",
  })
  public async delete(@Param('id', GetEntityPipe()) user: User) {
    return await this.userService.delete(user.id);
  }
}
