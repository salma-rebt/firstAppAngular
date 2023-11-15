import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../modele/product.modele";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient){ }

  public getProducts(page:number=1, size:number=4):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`); // gérer la pagination avec json server
  }

  public  checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked: !product.checked});
  }

  public deleteProduct(product:Product){
   return this.http.delete<Product>(`http://localhost:8089/products/${product.id}`);
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products`,product);


  }

  searchProduct(keyword: String):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
  }

  getProductsByID(productId: number) :Observable<Product>{
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`);
  }

  updateProduct(product: Product) :Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product);

  }
}
