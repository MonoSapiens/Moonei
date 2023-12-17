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
import { CashFlowMSG, ChatMSG, NotificationMSG, ReminderMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { ICashFlow } from 'src/common/interfaces/cashFlow.interface';
import { INotification } from 'src/common/interfaces/notification.interface';
import { ChatDTO } from './dto/chat.dto';
import { IChat } from 'src/common/interfaces/chat.interface';


@ApiTags('Microservicio de chat (microservice-chat)')
@UseGuards(JwtAuthGuard)

@Controller('api/chat')
export class ChatController {


    constructor(private readonly clientProxy: ClientProxyMoonei) { }

    private _clientProxyChat = this.clientProxy.clientProxyChat();

    // METODOS CRUD para Reminder

    /*  
    Método para crear un nueva chat a partir de un usuario. 
    */
    @Post('/create')
    @ApiOperation({ summary: 'Crear un chat' })
    async addProject(@Body() chatDTO: ChatDTO, @Req() req: any) {
        return await this._clientProxyChat.send(ChatMSG.CREATE, chatDTO);
    }

    /*  
    Método para  obtener un chat a partir del id.
    */
    @Get('/get/id/:id')
    @ApiOperation({ summary: 'Obtener chat por id' })
    async findOne(@Param('id') id: string) {
        return await this._clientProxyChat.send(ChatMSG.FIND_ONE, id);
    }

    /*  
    Método para  obtener un chat a partir del id.
    */
    @Get('/get/all')
    @ApiOperation({ summary: 'Obtener todos los chat' })
    async findAll() {
        return await this._clientProxyChat.send(ChatMSG.FIND_ALL, '');
    }

    /*  
    Método para actualizar un chat a partir del id.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar chat por id' })
    async update(
        @Param('id') id: string,
        @Body() chatDTO: ChatDTO,
    ): Promise<Observable<IChat>> {
        return await this._clientProxyChat.send(ChatMSG.UPDATE, { id, chatDTO });
    }

    /*  
    Método para borrar permanentemente un chat a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un chat por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyChat.send(ChatMSG.DELETE, id);
    }


}
