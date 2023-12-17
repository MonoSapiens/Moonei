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
import { CashFlowMSG, CategoryMSG, ChatMSG, InvestmentMSG, NotificationMSG, ReminderMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { ICashFlow } from 'src/common/interfaces/cashFlow.interface';
import { INotification } from 'src/common/interfaces/notification.interface';
import { IChat } from 'src/common/interfaces/chat.interface';
import { ICategory } from 'src/common/interfaces/category.interface';
import { InvestmentDTO } from './dto/investment.dto';
import { IInvestment } from 'src/common/interfaces/investment.interface';



@ApiTags('Microservicio de investment (microservice-investment)')
@UseGuards(JwtAuthGuard)
@Controller('api/investment')
export class InvestmentController {

    constructor(private readonly clientProxy: ClientProxyMoonei) { }

    private _clientProxyInvestment = this.clientProxy.clientProxyInvestment();

    // METODOS CRUD para investment

    /*  
    Método para crear un nueva inversion a partir de un usuario. 
    */
    @Post('/create')
    @ApiOperation({ summary: 'Crear un inversion' })
    async addProject(@Body() investmentDTO: InvestmentDTO, @Req() req: any) {
        return await this._clientProxyInvestment.send(InvestmentMSG.CREATE, investmentDTO);
    }

    /*  
    Método para  obtener un inversion a partir del id.
    */
    @Get('/get/id/:id')
    @ApiOperation({ summary: 'Obtener inversion por id' })
    async findOne(@Param('id') id: string) {
        return await this._clientProxyInvestment.send(InvestmentMSG.FIND_ONE, id);
    }

    /*  
    Método para  obtener un inversion a partir del id.
    */
    @Get('/get/all')
    @ApiOperation({ summary: 'Obtener todos los inversion' })
    async findAll() {
        return await this._clientProxyInvestment.send(CategoryMSG.FIND_ALL, '');
    }

    /*  
    Método para actualizar un inversion a partir del id.
    */
    @Put(':id')
    @ApiOperation({ summary: 'Actualizar inversion por id' })
    async update(
        @Param('id') id: string,
        @Body() investmentDTO: InvestmentDTO,
    ): Promise<Observable<IInvestment>> {
        return await this._clientProxyInvestment.send(InvestmentMSG.UPDATE, { id, investmentDTO });
    }

    /*  
    Método para borrar permanentemente un inversion a partir del id.
    */
    @Delete(':id')
    @ApiOperation({ summary: 'Borrar permanentemente un inversion por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyInvestment.send(InvestmentMSG.DELETE, id);
    }
}
