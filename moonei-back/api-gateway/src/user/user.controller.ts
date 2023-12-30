import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { Observable } from 'rxjs';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { UserMSG } from 'src/common/constants';
  import { IUser } from 'src/common/interfaces/user.interface';
  import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
  import { UserDTO } from './dto/user.dto';
  
  @ApiTags('Microservicio de usuarios (microservice-users)')
  @UseGuards(JwtAuthGuard)
  @Controller('api/user')
  export class UserController {
  
    // Entrada: cliente proxy global
    constructor(private readonly clientProxy: ClientProxyMoonei) { }
  
    // cliente proxy de usuarios
    private _clientProxyUser = this.clientProxy.clientProxyUser();

  
    // METODOS CRUD para usuarios
  
    /*  
    Metodo para crear un nuevo usuario.
    */
    @Post()
    @ApiOperation({ summary: 'Crear un usuario' })
    create(@Body() userDTO: UserDTO): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
    }
  
    /*  
    Metodo para  obtener un usuario a partir del id.
    */
    @Get('perfil/:id')
    @ApiOperation({ summary: 'Obtener usuario por id' })
    findOne(@Param('id') id: string): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }
  
    
    /*  
    Metodo para  obtener un usuario a partir del id.
    */
    @Get('resetpass/:email')
    @ApiOperation({ summary: 'obtener nueva contraseña' })
    resetPass(@Param('email') email: string): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.FIND_ONE, email);
    }
  
    /*  
    Metodo para  obtener un usuario a partir del id.
    */
    @Get('get/allUser')
    @ApiOperation({ summary: 'Obtener todos los usariosusuario' })
    findAll(): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
    }
  
    /*  
    Metodo para  obtener un usuario a partir del email.
    */
    @Get('perfil/email/:email')
    @ApiOperation({ summary: 'obtener usuario por email' })
    findOneByEmail(@Param('email') email: string): Observable<any> {
      return this._clientProxyUser.send('USER_BY_EMAIL', email);
    }
  
    /*  
    Metodo para  obtener un usuario a partir del token JWT. 
    */
    @Get('/userLogin')
    @ApiOperation({ summary: 'obtener usuario por token JWT' })
    userLogin(@Req() req: any) {
      return req.user;
    }
  
    /*  
    Metodo para actualizar el color de un usuario
    */
    @Put('/update/:id/color')
    @ApiOperation({ summary: 'Actualizar color del usuario por id' })
    updateColor(@Param('id') id: string, @Body() userDTO: any): Observable<IUser> {
      return this._clientProxyUser.send('UPDATE_COLOR', { id, userDTO });
    }
  
    /*  
    Metodo para actualizar última sección usuario
    */
    @Put('/update/:id/section')
    @ApiOperation({ summary: 'Actualizar sección del usuario por id' })
    updateSection(@Param('id') id: string, @Body() userDTO: any): Observable<IUser> {
      return this._clientProxyUser.send('UPDATE_SECTION', { id, userDTO });
    }
  
      /*  
    Metodo para actualizar el color de un usuario
    */
    @Put('/update/:id/access/date/limit')
    @ApiOperation({ summary: 'Actualizar fecha de acceso limite del usuario por id' })
    updateAccessDateLimit(@Param('id') id: string, @Body() userDTO: any): Observable<IUser> {
      return this._clientProxyUser.send('ACCESS_DATE_LIMIT', { id, userDTO });
    }
  
    /*  
    Metodo para actualizar usuario
    */
    @Put('/update/:id/profile')
    @ApiOperation({ summary: 'Actualizar usuario por id' })
    update(@Param('id') id: string, @Body() userDTO: any): Observable<IUser> {
      return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
    }
  
  
    /*  
    Metodo para borrar permanentemente un usuario a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un usuario por id' })
    delete(@Param('id') id: string): Observable<any> {
      return this._clientProxyUser.send(UserMSG.DELETE, id);
    }
  
    /*  
    Metodo para borrar permanentemente un usuario a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un usuario por id' })
    getAll(@Param('id') id: string): Observable<any> {
      return this._clientProxyUser.send('allusers', id);
    }
  
    /*  
    Metodo para contar la cantidad de usuarios totales
    */
    @Get('/counts')
    @ApiOperation({ summary: 'obtener la cantidad total de usuarios' })
    countUsers(@Req() req: any) {
      console.log("hola");
      return this._clientProxyUser.send('countusers', '');
    }
  }
  