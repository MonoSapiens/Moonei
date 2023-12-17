import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class HomeDTO {
    @ApiProperty()
    @IsString()
    readonly name: string;
}