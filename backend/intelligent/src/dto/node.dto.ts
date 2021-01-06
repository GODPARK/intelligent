import { from } from "rxjs";
import { LinkDto } from './link.dto'
import { UrlDto } from './url.dto'

export class NodeDto {
    name: string;
    info: string;
    category: string;
    detail: Array<UrlDto>;
    link: Array<LinkDto>;
}