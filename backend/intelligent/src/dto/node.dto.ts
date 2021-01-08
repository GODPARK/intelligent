import { ApiProperty } from "@nestjs/swagger";
import { LinkDto } from './link.dto'

export class NodeDto {
    _id: string;
    @ApiProperty({
        description: 'this is node name',
    })
    name: string;
    @ApiProperty({
        description: 'this is node infomation',
    })
    info: string;
    @ApiProperty({
        description: 'this is node category',
    })
    category: string;
    @ApiProperty({
        description: 'this is node category detail',
    })
    detail: string;
    link: Array<LinkDto>;
    create: Date;
    update: Date;
    delete: Date;
    state: number;
    @ApiProperty({
        description: 'node color',
    })
    color: string;
}