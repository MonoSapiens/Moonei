import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChatDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string
}