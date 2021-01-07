import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LinkDto } from '../dto/link.dto'

export type NodeDocument = Node & Document;

@Schema()
export class Node {
    @Prop({ required: true })
    name: string;

    @Prop()
    info: string;

    @Prop()
    category: string;
    @Prop()
    detail: string;

    @Prop([LinkDto])
    link: LinkDto[]

    @Prop()
    create: Date
    
    @Prop()
    update: Date

    @Prop()
    delete: Date

    @Prop()
    state: number

    @Prop()
    color: string
}

export const NodeSchema = SchemaFactory.createForClass(Node)