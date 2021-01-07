import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Res, ShutdownSignal } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeDto } from '../dto/node.dto';
import { Node } from '../schemas/node.schema'

@Controller('/api/node')
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
    getNodeByParam(@Param('id') id: string ): Promise<Node> {
        return this.nodeService.findOne(id)
    }

    @Get('/category/:name')
    getNodeByCategory(@Param('name') name: string): Promise<Node[]> {
        return this.nodeService.findAllByCategory(name)
    }

    @Post()
    createNode(@Body() nodeDto: NodeDto): Promise<Node> {
        return this.nodeService.createNode(nodeDto)
    }

    @Patch('/link')
    connectNode(@Body() link: { sid: string, tid: string}): Promise<Node[]> {
        return this.nodeService.connectLink(link.sid, link.tid)
    }

    @Patch('/unlink')
    disConnectNode(@Body() link: { sid: string, tid: string}): Promise<Node[]> {
        return this.nodeService.disConnectLink(link.sid, link.tid)
    }

    @Patch()
    updateNode(@Body() updateDto: { id: string, node: NodeDto }): Promise<Node> {
        return this.nodeService.updateNode(updateDto.id, updateDto.node)
    }

    @Delete()
    deleteNode(@Body() deleteDto: { id: string }): Promise<Node> {
        return this.nodeService.deleteNode(deleteDto.id)
    }
}
