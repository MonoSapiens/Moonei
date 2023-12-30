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
import { CashFlowMSG } from 'src/common/constants';
import { ClientProxyMoonei } from 'src/common/proxy/client-proxy';
import { CashFlowDTO } from './dto/cashFlow.dto';
import { ICashFlow } from 'src/common/interfaces/cashFlow.interface';

@ApiTags('Microservicio de cashflow (microservice-cash-flow)')
@UseGuards(JwtAuthGuard)
@Controller('api/cash-flow')
export class CashFlowController {

    constructor(private readonly clientProxy: ClientProxyMoonei) { }

    private _clientProxyCashFlow = this.clientProxy.clientProxyCashFlow();


    // METODOS CRUD para cashflow

    /*  
    Método para crear un nueva cashflow a partir de un usuario. 
    */
    @Post('/create')
    @ApiOperation({ summary: 'Crear un cash flow' })
    async addProject(@Body() cashFlowDTO: CashFlowDTO, @Req() req: any) {
        console.log("CREANDO cash flow");
        return await this._clientProxyCashFlow.send(CashFlowMSG.CREATE, cashFlowDTO);
    }

    /*  
    Método para  obtener un cash flow a partir del id.
    */
    @Get('/get/id/:id')
    @ApiOperation({ summary: 'Obtener cash flow por id' })
    async findOne(@Param('id') id: string) {
        return await this._clientProxyCashFlow.send(CashFlowMSG.FIND_ONE, id);
    }

    /*  
    Método para  obtener un cash flow a partir del id.
    */
    @Get('/get/all')
    @ApiOperation({ summary: 'Obtener todos los cash flow' })
    async findAll() {
        return await this._clientProxyCashFlow.send(CashFlowMSG.FIND_ALL, '');
    }

    /*  
    Método para actualizar un cash flow a partir del id.
    */
    @Put('/:id')
    @ApiOperation({ summary: 'Actualizar cash flow por id' })
    async update(
        @Param('id') id: string,
        @Body() cashFlowDTO: CashFlowDTO,
    ): Promise<Observable<ICashFlow>> {
        return await this._clientProxyCashFlow.send(CashFlowMSG.UPDATE, { id, cashFlowDTO });
    }

    /*  
    Método para borrar permanentemente un cash flow a partir del id.
    */
    @Delete('/:id')
    @ApiOperation({ summary: 'Borrar permanentemente un cash flow por id' })
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyCashFlow.send(CashFlowMSG.DELETE, id);
    }

}
