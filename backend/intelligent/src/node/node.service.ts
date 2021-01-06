import { Model } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NodeDto } from '../dto/node.dto';
import { Node, NodeDocument } from '../schemas/node.schema'

@Injectable()
export class NodeService {
    constructor(@InjectModel(Node.name) private nodeModel: Model<NodeDocument>) {}
    
    async findOne(id: string): Promise<Node> {
        if ( id == undefined || id == '') {
            throw new NotFoundException(`node id is empty`)
        }
        try {
            const node = await this.nodeModel.findById({ _id: id}).exec()
            if (!node) {
                throw new NotFoundException(`node: ${id} is not found`)
            }
            return node
        }
        catch(err) {
            throw new BadRequestException(`node cannot found: ${err}`)
        }
    }

    async findAll(): Promise<Node[]> {
        return this.nodeModel.find().exec()
    }

    async create(nodeDto: NodeDto): Promise<Node> {
        const createdNode = new this.nodeModel(nodeDto)
        return createdNode.save()
    }
}
