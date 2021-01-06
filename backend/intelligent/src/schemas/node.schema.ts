import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LinkDto } from '../dto/link.dto'
import { UrlDto } from '../dto/url.dto'

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

    @Prop([UrlDto])
    url: UrlDto[]
}

export const NodeSchme = SchemaFactory.createForClass(Node)