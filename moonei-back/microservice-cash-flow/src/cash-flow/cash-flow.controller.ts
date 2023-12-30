import { Controller } from '@nestjs/common';
import { CashFlowService } from './cash-flow.service';
import { CashFlowMSG } from './common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('cash-flow')
export class CashFlowController {

    constructor(private readonly cashFlowService: CashFlowService) { }

    /* 
    Modelo estructural de datos:
  
      1. IProject:    Interface
  
      2. ProjectMSG:  Mensajeria por RabbitMQ
  
      3. projectDTO:  ProjectDTO: Objeto de transferencia de datos 
  
    */
  
    // METODOS CRUD para proyectos
  
    /*  
    Método para crear un nueva proyecto a partir de un usuario. 
    (se autoasigna como jefe de proyecto al usuario que crea el proyecto)
    */
    @MessagePattern(CashFlowMSG.CREATE)
    async create(@Payload() payload: any) {
      return await this.cashFlowService.createCashFlow(payload);
    }
  
    /*  
    Método para  obtener todos los proyectos
    */
    @MessagePattern(CashFlowMSG.FIND_ALL)
    async findAll() {
      return await this.cashFlowService.findAll();
    }
  
    /*  
    Método para  obtener un proyecto a partir del id.
    entrada: id del proyecto. 
    salida: objeto del proyecto encontrada.  
    */
    @MessagePattern(CashFlowMSG.FIND_ONE)
    async findOne(@Payload() id: string) {
      return await this.cashFlowService.findOne(id);
    }
  
    /*  
    Método para actualizar un proyecto a partir del id.
    entrada: id del proyecto y nuevos datos del proyecto. 
    salida: objeto del proyecto actualizada.
    */
    @MessagePattern(CashFlowMSG.UPDATE)
    async update(@Payload() payload: any) {
      return await this.cashFlowService.update(payload.id, payload.projectDTO);
    }
  
    /*  
    Método para borrar permanentemente un proyecto a partir del id.
    entrada: id del proyecto.
    salida: valor booleano de confirmación.
    */
    @MessagePattern(CashFlowMSG.DELETE)
    async delete(@Payload() id: string) {
      return await this.cashFlowService.delete(id);
    }


}
