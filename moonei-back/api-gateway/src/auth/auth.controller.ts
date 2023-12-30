import { Body, Controller, Get, Param, Post, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Observable } from 'rxjs';
import { LoginDTO } from './dto/Login.dto';
import { RegisterDTO } from './dto/Register.dto';

@ApiTags('Autentificación (auth)')
@Controller('api/auth')
export class AuthController {

    constructor(private readonly jwtService: JwtService, private readonly clientProxy: ClientProxyMoonei, private readonly authService: AuthService) {
    }

    // cliente proxy de notificaciones
    private _clientProxyNotifications =
        this.clientProxy.clientProxyNotification();

    // cliente proxy de usuarios
    private _clientProxyUser = this.clientProxy.clientProxyUser();

    /*  
    Metodo para iniciar sesión de usuario.
    */
    @Post('signin')
    @ApiOperation({ summary: 'Ingresa a un usuario' })
    async signIn(@Body() loginDto: LoginDTO) {
        console.log("obteniendo usuario", loginDto);
        const isExist = await this._clientProxyUser.send('VALID_USER', loginDto).toPromise();
        if (isExist) {
            console.log("existe");
            const payload = {
                id: isExist.id,
                email: isExist.email
            }
            const token = await this.jwtService.sign(payload);
            return { token };
        }
        else {
            console.log("no existe");
            throw new UnprocessableEntityException('No existe el usuario especificado o la contraseña es incorrecta.');
        }
    }

    /*  
   Metodo para registrar un usuario nuevo.
   */
    @Post('signup')
    @ApiOperation({ summary: 'registra un usuario' })
    async signUp(@Body() registerDTO: RegisterDTO) {
        console.log("solicitando crear el usuario: ", registerDTO);
        const isExist = await this._clientProxyUser.send(UserMSG.CREATE, registerDTO).toPromise();
        if (isExist) {
            console.log("usuario creado: ", isExist);
            return { isExist };
        }
        else {
            console.log("Correo ya registrado")
            throw new UnprocessableEntityException('Ya existe un usuario con ese correo electronico.');
        }
    }


    /*  
    Metodo para resetear contraseña y obtener una nueva mediante correo electronico
    */
    @Get('resetpass/:email')
    @ApiOperation({ summary: 'obtener nueva contraseña' })
    async resetPass(@Param('email') email: string): Promise<Observable<any>> {
        const user = await this._clientProxyUser.send('RESET_PASS', email).toPromise();
        if (user) {
            await this._clientProxyNotifications.send('SEND_PASS', user).toPromise();
            return user;
        }
        else {
            throw new UnprocessableEntityException('no existe un usuario con ese correo electronico.');
        }
    }

    /*  
Metodo para resetear contraseña y obtener una nueva mediante correo electronico
*/
    @Post('notify/user/invited/new')
    @ApiOperation({ summary: 'obtener nueva contraseña' })
    async notifyNewUser(@Body() newUser: any): Promise<Observable<any>> {
        return await this._clientProxyNotifications.send('SEND_INVITED_NEW_USER', newUser).toPromise();
    }

}
