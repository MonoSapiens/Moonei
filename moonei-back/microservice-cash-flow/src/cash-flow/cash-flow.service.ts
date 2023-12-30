import { HttpStatus, Injectable } from '@nestjs/common';
import { ICashFlow } from './common/interfaces/cash-flow.interface';
import { CashFlowDTO } from './dto/cashFlow.dto';
import { CASH_FLOW } from './common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CashFlowService {


    constructor(
        @InjectModel(CASH_FLOW.name) private readonly model: Model<ICashFlow>,
    ) { }

    /*  
    Método para crear un nuevo cash flow a partir de un usuario. 
    (se autoasigna como jefe de cash flow  al usuario que crea el proyecto) 
    */
    async create(CashFlowDTO: any): Promise<ICashFlow> {
        const newCashFlow = new this.model(CashFlowDTO);
        return await newCashFlow.save();

    }

    /*  
    Método para  obtener todos los cash flow 
    */
    async findAll(): Promise<ICashFlow[]> {
        return await this.model.find();
    }

    /*  
    Método para  obtener un cash flow  a partir del id.
    */
    async findOne(id: string): Promise<ICashFlow> {
        return await this.model.findById(id);
    }

    /*  
    Método para actualizar un cash flow  a partir del id.
    */
    async update(id: string, cashFlowDTO: CashFlowDTO): Promise<ICashFlow> {
        return await this.model.findByIdAndUpdate(id, cashFlowDTO, { new: true });
    }

    /*  
    Método para borrar permanentemente un cash flow a partir del id.
    */
    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            msg: 'Deleted',
        };
    }



}
