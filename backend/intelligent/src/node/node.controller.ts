import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeDto } from '../dto/node.dto';
import { Node } from '../schemas/node.schema'

@Controller('node')
export class NodeController {
    constructor(private readonly nodeService: NodeService) {}
    
    @Get('all')
    getNodeALL(): Promise<Node[]> {
        return this.nodeService.findAll()
    }

    @Get()
    getNodeByBody(@Body() idDto: { id: string }): Promise<Node> {
        return this.nodeService.findOne(idDto.id)
    }

    @Get('/:id')
    getNodeByParam(@Param('id') id: string ) {
        return this.nodeService.findOne(id)
    }

    @Post()
    createNode(@Body() nodeDto: NodeDto): Promise<Node> {
        return this.nodeService.create(nodeDto)
    }

    // @Patch()
    // updateNode(@Body() NodeDto: NodeDto): Promise<Node> {
        
    // }
    // @Delete()
    // deleteNode(@Body() idDto: { id: string }): Promise<Node> {
    //     return this.nodeService
    // }
}
