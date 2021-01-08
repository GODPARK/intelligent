import { ApiProperty } from "@nestjs/swagger";

export class IdDto {
    @ApiProperty({
        description: 'this is node id'
    })
    id: string;
}

export class ConnectDto {
    @ApiProperty({
        description: 'this is source node id'
    })
    sid: string;
    @ApiProperty({
        description: 'this is target node id'
    })
    tid: string;
}