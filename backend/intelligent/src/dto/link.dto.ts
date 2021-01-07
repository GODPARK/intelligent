export class LinkDto {
    constructor(id: string, name: string, category: string, color: string) {
        this.link_id = id
        this.link_name = name
        this.link_category = category
        this.link_color = color
    }
    
    link_id: string;
    link_name: string;
    link_category: string;
    link_color: string;
}