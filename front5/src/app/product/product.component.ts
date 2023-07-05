import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DialogAnimationsDialog } from '../dialog/button-dialog';

@Component({
  selector: 'product-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any = [];
  public carts: any = [];
  id: any = 0;
  mes: string = '';

  displayedColumns: string[] = [
    'position',
    'image',
    'name',
    'company',
    'price',
    'quantity',
    'add'
  ];
  constructor(
    private httpService: ProductService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) { }

  openDialogCart(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  showCart(): void {
    this.httpService.getAllCart().subscribe((res) => {
      res;
      this.carts = res;

    });
  }
  showProduct(): void {
    this.httpService.getProduct().subscribe((res) => {
      this.products = res;
    })
  }

  onSubmit(product: Product) {
    product.id = this.id;
    let body = {
      id: product.id,
      name: product.name,
      image: product.image,
      company: product.company,
      price: product.price,
      quantity: product.quantity = 1,
      quan: product.quan = 0
    }
    this.httpService.postProduct(body).subscribe((res) => res)
    if (body) {
      this.httpService.delete_duble_product().subscribe((res) => {
        res
      })
    }
    if (product.quantity >= 2) {
      this.carts.push(body)
    }
    if (this.carts.push(body)) {
      this.upp_prod(body)
      this.httpService.postCart(body).subscribe((res) => res)
      this.upp(body)

    }
  }

  upp_prod(product: any) {

    let body = {
      id: product.id,
      name: product.name,
      image: product.image,
      company: product.company,
      price: product.price,
      quantity: product.quantity,
      quan: product.quan
    }

    this.httpService.upp_product(body, product.id)
      .subscribe(res => {
        res;
      })
  }

  upp(cart: any) {
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

  ngOnInit(): void {
    this.httpService.curMeS.subscribe(mes => { this.mes = mes;  console.log(mes,'MES2') })
    this.showCart();
    this.showProduct();
  }
}

