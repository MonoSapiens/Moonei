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
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CashFlowMSG, ChatMSG, HomeMSG, NotificationMSG, ReminderMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { ICashFlow } from 'src/common/interfaces/cashFlow.interface';
import { INotification } from 'src/common/interfaces/notification.interface';
import { IChat } from 'src/common/interfaces/chat.interface';
import { HomeDTO } from './dto/home.dto';
import { IHome } from 'src/common/interfaces/home.interface';


@ApiTags('Microservicio de home (microservice-home)')
@UseGuards(JwtAuthGuard)
@Controller('api/home')
export class HomeController {

    constructor(private readonly clientProxy: ClientProxyMoonei) { }

    private _clientProxyHome = this.clientProxy.clientProxyHome();


    // METODOS CRUD para home

    /*  
    Método para crear un nueva home a partir de un usuario. 
    */
    @Post('/create')
    @ApiOperation({ summary: 'Crear un home' })
    async addProject(@Body() homeDTO: HomeDTO, @Req() req: any) {
        return await this._clientProxyHome.send(HomeMSG.CREATE, homeDTO);
    }

    /*  
    Método para  obtener un home a partir del id.
    */
    @Get('/get/id/:id')
    @ApiOperation({ summary: 'Obtener home por id' })
    async findOne(@Param('id') id: string) {
        return await this._clientProxyHome.send(HomeMSG.FIND_ONE, id);
    }

    /*  
    Método para  obtener un home a partir del id.
    */
    @Get('/get/all')
    @ApiOperation({ summary: 'Obtener todos los home' })
    async findAll() {
        return await this._clientProxyHome.send(HomeMSG.FIND_ALL, '');
    }

    /*  
    Método para actualizar un home a partir del id.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar home por id' })
    async update(
        @Param('id') id: string,
        @Body() homeDTO: HomeDTO,
    ): Promise<Observable<IHome>> {
        return await this._clientProxyHome.send(HomeMSG.UPDATE, { id, homeDTO });
    }

    /*  
    Método para borrar permanentemente un home a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un home por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyHome.send(HomeMSG.DELETE, id);
    }

}
