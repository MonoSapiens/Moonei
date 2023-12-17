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
import { CashFlowMSG, CategoryMSG, ChatMSG, NotificationMSG, ReminderMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { ICashFlow } from 'src/common/interfaces/cashFlow.interface';
import { INotification } from 'src/common/interfaces/notification.interface';
import { IChat } from 'src/common/interfaces/chat.interface';
import { CategoryDTO } from './dto/category.dto';
import { ICategory } from 'src/common/interfaces/category.interface';



@ApiTags('Microservicio de category (microservice-category)')
@UseGuards(JwtAuthGuard)
@Controller('api/category')
export class CategoryController {

    constructor(private readonly clientProxy: ClientProxyMoonei) { }

    private _clientProxyCategory = this.clientProxy.clientProxyCategory();

  // METODOS CRUD para Reminder

    /*  
    Método para crear un nueva category a partir de un usuario. 
    */
    @Post('/create')
    @ApiOperation({ summary: 'Crear un category' })
    async addProject(@Body() categoryDTO: CategoryDTO, @Req() req: any) {
        return await this._clientProxyCategory.send(CategoryMSG.CREATE, categoryDTO);
    }

    /*  
    Método para  obtener un category a partir del id.
    */
    @Get('/get/id/:id')
    @ApiOperation({ summary: 'Obtener category por id' })
    async findOne(@Param('id') id: string) {
        return await this._clientProxyCategory.send(CategoryMSG.FIND_ONE, id);
    }

    /*  
    Método para  obtener un category a partir del id.
    */
    @Get('/get/all')
    @ApiOperation({ summary: 'Obtener todos los category' })
    async findAll() {
        return await this._clientProxyCategory.send(CategoryMSG.FIND_ALL, '');
    }

    /*  
    Método para actualizar un category a partir del id.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar category por id' })
    async update(
        @Param('id') id: string,
        @Body() categoryDTO: CategoryDTO,
    ): Promise<Observable<ICategory>> {
        return await this._clientProxyCategory.send(CategoryMSG.UPDATE, { id, categoryDTO });
    }

    /*  
    Método para borrar permanentemente un category a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un category por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyCategory.send(CategoryMSG.DELETE, id);
    }
}
