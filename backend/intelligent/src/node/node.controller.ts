import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, Res, ShutdownSignal } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeDto } from '../dto/node.dto';
import { Node } from '../schemas/node.schema'
import { ConnectDto, IdDto, StarDto } from 'src/dto/request.dto';

@Controller('/api/node')
export class NodeController {
    constructor(private readonly nodeService: NodeService) {}
    
    @Get('all')
    getNodeALL(): Promise<Node[]> {
        return this.nodeService.findAll()
    }

    @Get()
    getNodeByBody(@Body() idDto: IdDto): Promise<Node> {
        return this.nodeService.findOne(idDto.id)
    }
    
    @Get('/search/:keyword')
    getNodeByKeyword(@Param('keyword') keyword: string ): Promise<Node[]> {
        return this.nodeService.findAllByKeyword(keyword)
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
    connectNode(@Body() connectDto: ConnectDto): Promise<Node[]> {
        return this.nodeService.connectLink(connectDto.sid, connectDto.tid)
    }

    @Patch('/unlink')
    disConnectNode(@Body() connectDto: ConnectDto): Promise<Node[]> {
        return this.nodeService.disConnectLink(connectDto.sid, connectDto.tid)
    }

    @Patch()
    updateNode(@Body() nodeDto: NodeDto): Promise<Node> {
        return this.nodeService.updateNode(nodeDto)
    }
    
    @Patch('/star')
    updateStarNode(@Body() starDto: StarDto): Promise<Node> {
        return this.nodeService.updateNodeStar(starDto)
    }

    @Delete()
    deleteNode(@Body() deleteDto: IdDto): Promise<Node> {
        return this.nodeService.deleteNode(deleteDto.id)
    }
}
