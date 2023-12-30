import { Controller } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CashFlowMSG } from './common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('cash-flow')
export class CashFlowController {

    constructor(private readonly cashFlowService: CashFlowService) { }

    // METODOS CRUD para cash flow 

    /*  
    Método para crear un nueva cash flow  a partir de un usuario. 
    (se autoasigna como jefe de cash flow  al usuario que crea el proyecto)
    */
    @MessagePattern(CashFlowMSG.CREATE)
    async create(@Payload() payload: any) {
        return await this.cashFlowService.create(payload);
    }

    /*  
    Método para  obtener todos los cash flow 
    */
    @MessagePattern(CashFlowMSG.FIND_ALL)
    async findAll() {
        return await this.cashFlowService.findAll();
    }

    /*  
    Método para  obtener un cash flow a partir del id.
    */
    @MessagePattern(CashFlowMSG.FIND_ONE)
    async findOne(@Payload() id: string) {
        return await this.cashFlowService.findOne(id);
    }

    /*  
    Método para actualizar un cash flow a partir del id.
    */
    @MessagePattern(CashFlowMSG.UPDATE)
    async update(@Payload() payload: any) {
        return await this.cashFlowService.update(payload.id, payload.cashFlowDTO);
    }

    /*  
    Método para borrar permanentemente un cash flow a partir del id.
    */
    @MessagePattern(CashFlowMSG.DELETE)
    async delete(@Payload() id: string) {
        return await this.cashFlowService.delete(id);
    }
}
