export class ProductDto {
    id?: number;
    name?: string;
    image?: any;
    gallery?:any[] = [];
    extract?: string;
    description?: string;
    price?: number;
    discountPrice?: number;
    category?: string;
    arraySearch?: any = [];
    status?:boolean;
    sku?: string;
    stock?: number;
    freeSend?:boolean = false;
}