import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { ProjectMSG } from 'src/common/constants';
  import { IProject } from 'src/common/interfaces/project.interface';

  import { ProjectDTO } from './dto/project.dto';
  import { Observable } from 'rxjs';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';

@ApiTags('Microservicio de proyectos (microservice-projects)')
@UseGuards(JwtAuthGuard)
@Controller('api/project')
export class ProjectController {

  // Entrada: cliente proxy global
  constructor(private readonly clientProxy: ClientProxyMoonei) { }

  // Proyectos
  private _clientProxyProject = this.clientProxy.clientProxyProject();

  // METODOS CRUD para proyectos

  /*  
  Método para crear un nueva proyecto a partir de un usuario. 
  (se autoasigna como jefe de proyecto al usuario que crea el proyecto)
  */
  @Post('create')
  @ApiOperation({ summary: 'Crear un proyecto' })
  async addProject(@Body() projectDTO: ProjectDTO, @Req() req: any) {
    return await this._clientProxyProject.send(ProjectMSG.CREATE, projectDTO);
  }

  /*  
  Método para  obtener un proyecto a partir del id.
  */
  @Get('/getProjectbyID/:id')
  @ApiOperation({ summary: 'Obtener proyecto por id' })
  async findOne(@Param('id') id: string) {
    return await this._clientProxyProject.send(ProjectMSG.FIND_ONE, id);
  }

  /*  
  Método para  obtener un proyecto a partir del id.
  */
  @Get('/get/all')
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  async findAll() {
    return await this._clientProxyProject.send(ProjectMSG.FIND_ALL, '');
  }

  /*  
  Método para actualizar un proyecto a partir del id.
  */
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar proyecto por id' })
  async update(
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Promise<Observable<IProject>> {
    return await this._clientProxyProject.send(ProjectMSG.UPDATE, { id, projectDTO });
  }

  /*  
  Método para borrar permanentemente un proyecto a partir del id.
  */
  @Delete(':id')
  @ApiOperation({ summary: 'Borrar permanentemente un proyecto por id' })
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyProject.send(ProjectMSG.DELETE, id);
  }

  

}
