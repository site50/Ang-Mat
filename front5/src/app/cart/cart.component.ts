import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ProductService } from '../product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsDialog } from '../dialog/button-dialog';

@Injectable({ providedIn: 'root' })
@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['./cart.component.scss'],
    providers: [ProductService],
})
export class CartComponent implements OnInit {
    carts: any = [];
    AllPrices = [];
    sumQuantity: any = 0;
    sumPrice: any = 0;
    total = 0;
    displayedColumnsCart: string[] = [
        'position',
        'image',
        'name',
        'price',
        'quantity',
        'price*quantity',
        '-',
        '+',
        'remove'
    ]
    displayedColumnsFooter: string[] = [
        'position',
        'image',
        'name',
        'price',
        'quantity',
        'price*quantity',
        '-',
        '+',
        'remove'
    ]
    constructor(private httpService: ProductService,
        public dialog: MatDialog,
    ) { }

    dialogRemove(enterAnimationDuration: string,
        exitAnimationDuration: string,
    ): void {
        this.dialog.open(DialogAnimationsDialog, {
            width: '550px',
            enterAnimationDuration,
            exitAnimationDuration,
        })
    }

    getTotalPrice() {
        this.httpService.getAllCart()
            .subscribe(
                response => {
                    this.carts = response;
                    this.AllPrices = this.carts.map((items: any) => (items.price * items.quantity))
                }
            )
    }

    TotalPrice(total: any, AllPrices: any) {
        var i;
        for (i in AllPrices) {
            total = total - AllPrices[i]
        }
        return total
    }

    uppdateCart(cart: any) {
        let body = {
            id: cart.id,
            name: cart.name,
            image: cart.image,
            company: cart.company,
            price: cart.price,
            quantity: cart.quantity,
            quan: cart.quan
        }
        this.httpService.upp_cart(body, cart.id)
            .subscribe(res => {
                res
            })
    }

    showCart(): void {
        this.httpService.getAllCart().subscribe((res) => {
            this.carts = res;
        })
        if (this.carts.length > 0) {
            this.newMes(this.carts);
            this.httpService.delete_duble_cart().subscribe((res) => { res; })
        }
        this.AllPrices = this.carts.map((items: any) => (items.price * items.quantity));
    }
    showQuantity(): void {
        this.httpService.getAllCart().subscribe((res) => {
            res;
            this.carts = res;
            if (this.carts) {
                this.carts.forEach((x: any) => { this.sumQuantity += x.quantity })
            }
        })
    }
    remove_cart(cart: any, id: any) {
        this.sumQuantity = this.sumQuantity - cart.quantity
        let body = {
            id: cart.id,
            name: cart.name,
            image: cart.image,
            company: cart.company,
            price: cart.price,
            quantity: cart.quantity = 1,
            quan: cart.quan = 1
        }
        this.httpService.postProduct(body).subscribe((res) => { res; });
        this.httpService
            .delete(id)
            .subscribe((res) => {
                res;
                this.uppdateCart(cart)
                this.showCart()
                this.getTotalPrice();
                this.uppdateProduct(body);
            })
    }

    newMes(m: any) {
        this.httpService.senMessag(m)
    }
    addQuantityCart(cart: any) {
        let body = {
            id: cart.id,
            name: cart.name,
            image: cart.image,
            company: cart.company,
            price: cart.price,
            quantity: cart.quantity += 1,
            quan: cart.quan = 1
        }
        this.httpService.postCart(body).subscribe(res => {
            res
            this.httpService.delete_duble_cart().subscribe((res) => {
                res
                this.sumQuantity++;
                this.getTotalPrice()
            })
        })
    }

    remove_quantity_cart(id: any, cart: any, quantity: any) {
        let body = {
            id: cart.id,
            name: cart.name,
            image: cart.image,
            company: cart.company,
            price: cart.price,
            quantity: cart.quantity -= 1,
            quan: cart.quan
        }
        this.httpService.postCart(body).subscribe((res) => {
            res;
            this.httpService.delete_duble_cart().subscribe((res) => {
                res;
                this.sumQuantity--;
            })
            if (cart.quantity == 0) {
                this.remove_cart(cart, id)
            }
            this.getTotalPrice()
        })
    }

    rem_quan_product(id: any, cart: any, quan: any) {
        let body = {
            id: cart.id,
            name: cart.name,
            image: cart.image,
            company: cart.company,
            price: cart.price,
            quantity: cart.quantity,
            quan: cart.quan = 1
        }
        this.httpService.postProduct(body).subscribe((res) => {
            res;
            this.uppdateProduct(body);
        })
    }

    uppdateProduct(product: any) {
        let body = {
            id: product.id,
            name: product.name,
            image: product.image,
            company: product.company,
            price: product.price,
            quantity: product.quantity,
            quan: product.quan = 1
        }
        this.httpService.upp_product(body, product.id)
            .subscribe(res => {
                res;
                this.httpService.delete_duble_product().subscribe((res) => { res; })
            })
    }

    ngOnInit(): void {
        this.showCart();
        this.getTotalPrice();
        this.showQuantity()
    }
}
