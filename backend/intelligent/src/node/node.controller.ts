import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeDto } from '../dto/node.dto';
import { Node } from '../schemas/node.schema'

@Controller('node')
export class NodeController {
    constructor(private readonly nodeService: NodeService) {}
    
    @Get()
    getNode(@Query('id') id: string ) {
        return this.nodeService.findOne(id)
    }

    @Get('all')
    getNodeALL(): Promise<Node[]> {
        return this.nodeService.findAll()
    }

    @Post()
    createNode(@Body() nodeDto: NodeDto): Promise<Node> {
        return this.nodeService.create(nodeDto)
    }
}
