import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ProductService } from '../product/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'dialog-animations-example-dialog',
    templateUrl: 'button-dialog.html',
    styleUrls: ['./button-dialog.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule
    ],
})

export class DialogAnimationsDialog {
    public carts: any = [];

    constructor(
        public dialogRef: MatDialogRef<DialogAnimationsDialog>,
        private httpService: ProductService,
        private router: Router
    ) { }

    showCart(): void {
        this.httpService.getAllCart().subscribe((res) => {
            this.carts = res;
        })
    }

    onClickCart() {
        this.router.navigate(['/cart']);
    }

    ngOnInit(): void {
        this.showCart();
    }
}