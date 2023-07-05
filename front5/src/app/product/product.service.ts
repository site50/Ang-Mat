import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Product } from './product';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class ProductService implements OnInit {
    private productUrl = 'http://localhost:3000/product';
    private cartURL = 'http://localhost:3000/carts';
    private mesS = new BehaviorSubject('Default');
    curMeS = this.mesS.asObservable();

    constructor(private http: HttpClient, public dialog: MatDialog) { }

    senMessag(mes: string) {
        console.log(mes, 'MES1')
        this.mesS.next(mes)
        console.log(mes, '1MES1')
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    getProduct(): Observable<any> {
        return this.http.get(`${this.productUrl}`)
    }
    getAllCart(): Observable<any> {
        return this.http.get(`${this.cartURL}`);
    }
    postCart(cart: Product) {
        return this.http.post(`${this.cartURL}`, cart);
    }
    postProduct(product: Product) {
        return this.http.post(`${this.productUrl}`, product);
    }
    delete_duble_product() {
        return this.http.delete(`${this.productUrl}`)
    }
    delete(id: string) {
        return this.http.delete(`${this.cartURL}/${id}`)
    }
    delete_duble_cart() {
        return this.http.delete(`${this.cartURL}`)
    }
    upp_cart(cart: any, id: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.put(`${this.cartURL}/${id}`, cart, { headers, responseType: 'text' })
    }
    upp_product(product: any, id: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.put(`${this.productUrl}/${id}`, product, { headers, responseType: 'text' })
    }

    ngOnInit() {
    }
}

