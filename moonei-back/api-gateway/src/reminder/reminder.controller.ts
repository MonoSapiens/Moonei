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
import { CashFlowMSG, NotificationMSG, ReminderMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { ICashFlow } from 'src/common/interfaces/cashFlow.interface';
import { INotification } from 'src/common/interfaces/notification.interface';
import { ReminderDTO } from './dto/reminder.dto';

@ApiTags('Microservicio de recordatorios (microservice-reminder)')
@UseGuards(JwtAuthGuard)

@Controller('api/reminder')
export class ReminderController {

    constructor(private readonly clientProxy: ClientProxyMoonei) { }

    private _clientProxyReminder = this.clientProxy.clientProxyReminder();


    // METODOS CRUD para Reminder

    /*  
    Método para crear un nueva recordatorio a partir de un usuario. 
    */
    @Post('/create')
    @ApiOperation({ summary: 'Crear un recordatorio' })
    async addProject(@Body() reminderDTO: ReminderDTO, @Req() req: any) {
        return await this._clientProxyReminder.send(ReminderMSG.CREATE, reminderDTO);
    }

    /*  
    Método para  obtener un recordatorio a partir del id.
    */
    @Get('/get/id/:id')
    @ApiOperation({ summary: 'Obtener recordatorio por id' })
    async findOne(@Param('id') id: string) {
        return await this._clientProxyReminder.send(ReminderMSG.FIND_ONE, id);
    }

    /*  
    Método para  obtener un recordatorio a partir del id.
    */
    @Get('/get/all')
    @ApiOperation({ summary: 'Obtener todos los recordatorio' })
    async findAll() {
        return await this._clientProxyReminder.send(ReminderMSG.FIND_ALL, '');
    }

    /*  
    Método para actualizar un recordatorio a partir del id.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar recordatorio por id' })
    async update(
        @Param('id') id: string,
        @Body() reminderDTO: ReminderDTO,
    ): Promise<Observable<INotification>> {
        return await this._clientProxyReminder.send(ReminderMSG.UPDATE, { id, reminderDTO });
    }

    /*  
    Método para borrar permanentemente un recordatorio a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un recordatorio por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyReminder.send(ReminderMSG.DELETE, id);
    }
}
