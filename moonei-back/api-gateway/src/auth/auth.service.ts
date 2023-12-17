import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';
import { LoginDTO } from './dto/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyMoonei,
    private readonly jwtService: JwtService,
  ) { }

  // cliente proxy de usuarios
  private _clientProxyUser = this.clientProxy.clientProxyUser();

  /*  
   Metodo para validar un usuario ingresado
   entrada: datos del usuario. 
   salida: boolean de usuario validado
  */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this._clientProxyUser.send(UserMSG.VALID_USER, { username, password })
  }

  /*  
   Metodo para iniciar sesion de usuario
   entrada: datos del usuario. 
   salida: objeto del nuevo usuario.  
  */
  async signIn(loginDto: LoginDTO) {
    const isExist = await this._clientProxyUser.send(UserMSG.VALID_USER, LoginDTO);
    return await this._clientProxyUser.send(UserMSG.VALID_USER, loginDto);
  }

  /*  
   Metodo para asginar token con una firma en especifica (id y email de usuario)
   entrada: datos del usuario. 
   salida: token jwt
  */
  async setToken(payload: any) {
    const token = await this.jwtService.sign(payload);
    return await token;
  }
  
  /*  
     Metodo para crear un nuevo usuario.
     entrada: datos del usuario. 
     salida: objeto del nuevo usuario.  
  */
  async signUp(userDTO: UserDTO) {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }
}
