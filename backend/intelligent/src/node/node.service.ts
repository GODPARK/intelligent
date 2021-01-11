import { Model } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NodeDto } from '../dto/node.dto';
import { Node, NodeDocument } from '../schemas/node.schema'
import { LinkDto } from 'src/dto/link.dto';
import { on } from 'process';

@Injectable()
export class NodeService {
    constructor(
        @InjectModel(Node.name) private nodeModel: Model<NodeDocument>,
        ) {}
    
    async findOne(id: string): Promise<Node> {
        if ( id == undefined || id == '') {
            throw new NotFoundException(`node id is empty`)
        }
        try {
            const node = await this.nodeModel.findById({ _id: id}).exec()
            if (!node || node.state == 0) {
                throw new NotFoundException(`node: ${id} is not found`)
            }
            return node
        }
        catch(err) {
            throw new BadRequestException(`node cannot found: ${err}`)
        }
    }

    async findAll(): Promise<Node[]> {
        const resultList = this.nodeModel.find().exec()
        if(!resultList || (await resultList).length == 0) {
            throw new NotFoundException(`not found node in database`)
        }
        return resultList
    }

    async findAllByCategory(name: string): Promise<Node[]> {
        const nameDecord = decodeURI(decodeURIComponent(name))
        const resultList = this.nodeModel.find(
            {
                $and: [
                    { state: 1 },
                    { category: nameDecord}
                ],
            }
        ).exec()
        if(!resultList || (await resultList).length == 0) {
            throw new NotFoundException(`not found node by category: ${nameDecord}`)
        }
        return resultList
    }

    async findAllByKeyword(keyword: string): Promise<Node[]> {
        const keywordDecord = decodeURI(decodeURIComponent(keyword))
        const resultList = this.nodeModel.find(
            { 
                $or:[
                    { name: { $regex: `.*${keywordDecord}.*`}},
                    { info: {$regex: `.*${keywordDecord}.*`}},
                    { category: {$regex: `.*${keywordDecord}.*`}}
                ],
                $and: [ { state: 1 } ],
            }
        ).exec()
        
        if (!resultList || (await resultList).length == 0) {
            throw new NotFoundException(`not found node by keyword: ${keywordDecord}`)
        }
        return resultList
    }

    async createNode(nodeDto: NodeDto): Promise<Node> {
        nodeDto.create = new Date()
        nodeDto.state = 1
        nodeDto.star = 0

        nodeDto.name = nodeDto.name.toLowerCase()
        nodeDto.info = nodeDto.info.toLowerCase()
        nodeDto.category = nodeDto.category.toLowerCase()
        nodeDto.detail = nodeDto.detail.toLowerCase()
        nodeDto.link = []

        if (!nodeDto.name) {
            throw new BadRequestException(`node name is empty`)
        }

        if (!nodeDto.category) {
            throw new BadRequestException(`node category is empty`)
        }

        const createdNode = new this.nodeModel(nodeDto)
        return createdNode.save()
    }

    async updateNode(nodeDto: NodeDto): Promise<Node> {
        
        const updateDto: any = {}

        if(!nodeDto._id) {
            throw new BadRequestException(`id is empty`)
        }
        
        if (nodeDto.name) updateDto.name = nodeDto.name
        if (nodeDto.info) updateDto.info = nodeDto.info
        if (nodeDto.detail) updateDto.detail = nodeDto.detail
        if (nodeDto.category) updateDto.category = nodeDto.category
        if (nodeDto.color) updateDto.color = nodeDto.color
        updateDto.update = new Date()

        const resultNode = await this.nodeModel.findByIdAndUpdate(nodeDto._id, updateDto, {new: true}).exec()
        return resultNode
    }

    async connectLink(sid: string, tid: string): Promise<Node[]> {
        if(!sid) {
            throw new BadRequestException(`sid is empty`)
        }
        if(!tid) {
            throw new BadRequestException(`tid is empty`)
        }
        const snode = await this.nodeModel.findById({ _id: sid}).exec()
        const tnode = await this.nodeModel.findById({ _id: tid}).exec()
        if (!snode || snode.state == 0) {
            throw new NotFoundException(`node: ${sid} is not found`)
        }
        if (!tnode || tnode.state == 0) {
            throw new NotFoundException(`node: ${tid} is not found`)
        }

        var sindex = snode.link.findIndex(link_value => link_value.link_id == tid);
        var tindex = snode.link.findIndex(link_value => link_value.link_id == sid);
        const resultNodeList = []
        if ( sindex == -1 && tindex == -1 ) {
            const sLink = new LinkDto(snode._id, snode.name, snode.category, snode.color)
            const tLink = new LinkDto(tnode._id, tnode.name, tnode.category, tnode.color)
            snode.link.push(tLink)
            tnode.link.push(sLink)
            resultNodeList.push(await this.nodeModel.findByIdAndUpdate(snode.id, snode, {new: true}).exec())
            resultNodeList.push(await this.nodeModel.findByIdAndUpdate(tnode.id, tnode, {new: true}).exec())
        }
        return resultNodeList
    }

    async disConnectLink(sid: string, tid: string): Promise<Node[]> {
        if(!sid) {
            throw new BadRequestException(`sid is empty`)
        }
        if(!tid) {
            throw new BadRequestException(`tid is empty`)
        }
        const snode = await this.nodeModel.findById({ _id: sid}).exec()
        const tnode = await this.nodeModel.findById({ _id: tid}).exec()
        if (!snode || snode.state == 0) {
            throw new NotFoundException(`node: ${sid} is not found`)
        }
        if (!tnode || tnode.state == 0) {
            throw new NotFoundException(`node: ${tid} is not found`)
        }

        var sindex = snode.link.findIndex(link_value => link_value.link_id == tid); 
        var tindex = tnode.link.findIndex(link_value => link_value.link_id == sid);
        if (sindex > -1) snode.link.splice(sindex, 1)
        if (tindex > -1) tnode.link.splice(tindex, 1)

        const resultNodeList = []
        resultNodeList.push(await this.nodeModel.findByIdAndUpdate(snode.id, snode, {new: true}).exec())
        resultNodeList.push(await this.nodeModel.findByIdAndUpdate(tnode.id, tnode, {new: true}).exec())
        return resultNodeList
    }

    async deleteNode(id: string): Promise<Node> {
        const deleteDto: any = {}

        if(!id) {
            throw new BadRequestException(`id is empty`)
        }

        deleteDto.delete = new Date()
        deleteDto.state = 0
        const deleteNode = await await this.nodeModel.findByIdAndUpdate(id, deleteDto, {new: true}).exec()
        deleteNode.link.forEach(async (oneLink: LinkDto) => {
            const tnode = await this.nodeModel.findById({ _id: oneLink.link_id }).exec()
            var tindex = tnode.link.findIndex(link_value => link_value.link_id == id);
            if (tindex > -1) tnode.link.splice(tindex, 1)
            await this.nodeModel.findByIdAndUpdate(tnode.id, tnode, {new: true}).exec();
        });

        return deleteNode
    }
}
