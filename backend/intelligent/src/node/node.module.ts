import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { Node, NodeSchme } from '../schemas/node.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Node.name, schema: NodeSchme }])],
  controllers: [NodeController],
  providers: [NodeService]
})
export class NodeModule {}
