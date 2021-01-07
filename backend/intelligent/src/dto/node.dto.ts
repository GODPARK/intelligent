import { from } from "rxjs";
import { LinkDto } from './link.dto'

export class NodeDto {
    _id: string;
    name: string;
    info: string;
    category: string;
    detail: string;
    link: Array<LinkDto>;
    create: Date;
    update: Date;
    delete: Date;
    state: number;
    color: string;
}