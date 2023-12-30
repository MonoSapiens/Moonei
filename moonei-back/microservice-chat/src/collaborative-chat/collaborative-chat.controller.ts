import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CollaborativeChatService } from './collaborative-chat.service';

@Controller()
export class CollaborativeChatController {

    constructor(private readonly collaborativeChatService: CollaborativeChatService) { }

    @MessagePattern('CREAR_COLLABORATIVE_CHAT')
    async create(@Payload() payload: any) {
        return await this.collaborativeChatService.create(payload);
    }

    @MessagePattern('BUSCAR_TODOS_COLLABORATIVE_CHAT')
    async findAll() {
        console.log("solicitando todos los chat colaborativos...");
        return await this.collaborativeChatService.findAll();
    }

    @MessagePattern('BUSCAR_UN_COLLABORATIVE_CHAT')
    async findOne(@Payload() id: string) {
        return await this.collaborativeChatService.findOne(id);
    }

    @MessagePattern("ACTUALIZAR_COLLABORATIVE_CHAT")
    async update(@Payload() payload: any) {
        return await this.collaborativeChatService.update(payload.id, payload.collaborativeChat);
    }

    @MessagePattern("BORRAR_COLLABORATIVE_CHAT")
    async delete(@Payload() id: string) {
        return await this.collaborativeChatService.delete(id);
    }

}
