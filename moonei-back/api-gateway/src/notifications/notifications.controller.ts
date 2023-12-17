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
import { NotificationMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { NotificationDTO } from './dto/notification.dto';
import { INotification } from 'src/common/interfaces/notification.interface';

@ApiTags('Microservicio de notifications (microservice-notifications)')
@UseGuards(JwtAuthGuard)
@Controller('api/notification')
export class NotificationsController {

    constructor(private readonly clientProxy: ClientProxyMoonei) { }

    private _clientProxyNotification = this.clientProxy.clientProxyNotification();

    // METODOS CRUD para notifications

    /*  
    Método para crear un nueva notificación a partir de un usuario. 
    */
    @Post('create')
    @ApiOperation({ summary: 'Crear un notificación' })
    async addProject(@Body() notificationDTO: NotificationDTO, @Req() req: any) {
        return await this._clientProxyNotification.send(NotificationMSG.CREATE, notificationDTO);
    }

    /*  
    Método para  obtener un notificación a partir del id.
    */
    @Get('/get/id/:id')
    @ApiOperation({ summary: 'Obtener notificación por id' })
    async findOne(@Param('id') id: string) {
        return await this._clientProxyNotification.send(NotificationMSG.FIND_ONE, id);
    }

    /*  
    Método para  obtener un notificación a partir del id.
    */
    @Get('/get/all')
    @ApiOperation({ summary: 'Obtener todos los notificación' })
    async findAll() {
        return await this._clientProxyNotification.send(NotificationMSG.FIND_ALL, '');
    }

    /*  
    Método para actualizar un notificación a partir del id.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar notificación por id' })
    async update(
        @Param('id') id: string,
        @Body() notificationDTO: NotificationDTO,
    ): Promise<Observable<INotification>> {
        return await this._clientProxyNotification.send(NotificationMSG.UPDATE, { id, notificationDTO });
    }

    /*  
    Método para borrar permanentemente un notificación a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un notificación por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyNotification.send(NotificationMSG.DELETE, id);
    }
}
