import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({ // décorateur --> annotation
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    EditProductComponent

  ],
  imports: [   // importer les modules dont on a besoin
    BrowserModule,
    FormsModule,      // simple form
    AppRoutingModule,  // systeme de routage
    HttpClientModule,  // pour gerer les requetes HTTP
    ReactiveFormsModule  // ractive form

  ],
  providers: [
    ProductService
  ],   // importer les services dont on a besoin
  bootstrap: [AppComponent]
})
export class AppModule { }
