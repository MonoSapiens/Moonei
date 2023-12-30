import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CollaborativeChatService {
    constructor(
        @InjectModel('collaborative-chat')
        private readonly model: Model<any>,
    ) { }

    async create(collaborativeChat: any) {
        const newCollaborativeChat = new this.model(collaborativeChat);
        return await newCollaborativeChat.save();
    }

    async findAll(): Promise<any[]> {
        console.log("encontrando todos los chat colaborativos...");
        return await this.model.find();
    }

    async findOne(id: string): Promise<any[]> {
        return await this.model.where({ _id: id })
    }

    async update(id: string, collaborativeChat: any): Promise<any> {
        return await this.model.findByIdAndUpdate(id, collaborativeChat, {
            new: true,
        });
    }

    async delete(id: string): Promise<any> {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            msg: 'Deleted',
        };
    }

}
