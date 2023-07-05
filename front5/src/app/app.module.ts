import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { ProductComponent } from './product/product.component';
import { BoxDirective } from './box.directive';
import { CartComponent } from './cart/cart.component';

@NgModule({
    declarations: [
      AppComponent,
      BoxDirective,
      ProductComponent,
      CartComponent
     
    ],
    imports: [
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      MaterialModule,
      AppRoutingModule,
      RouterModule
    ],
    bootstrap: [AppComponent],
  })
  export class AppModule { }
