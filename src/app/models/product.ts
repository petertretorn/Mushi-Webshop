import { Link } from "@app/models/link.model";

export class Product {
    name: string
    price: Number
    quantity: Number
    description: string
    id?: string
    imageUrl: string
    categoryId?: string
    instruction: string
    teaser: string
    links: Link[]
}
