import { Product } from '@app/models/product';

export class OrderLine {
    
    constructor(product: Product, quantity: number) {
        this.product = product
        this.quantity = quantity
    }
    
    quantity: number
    product: Product
}