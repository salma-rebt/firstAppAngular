import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../modele/product.modele";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  public keyword:String="";
  constructor(private productService: ProductService,private router:Router) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(1,3) //valeurs de paginations
      .subscribe({    // observable.subscribe => resultat dans observer
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err);
        }
      })
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({ // lors du coche de checkebox
      next: updatedProduct => {
        product.checked = !product.checked
      }
    })
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sùre de vouloir supprimer !!"))
    this.productService.deleteProduct(product).subscribe({
      next: value => {
        // this.getProducts(); 1er solution
        this.products = this.products.filter(p => p.id != product.id); // 2éme solution

      }
    })
  }

  searchProduct() {
    this.productService.searchProduct(this.keyword).subscribe({
      next : value => {
        this.products = value;

      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleUpdate(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)

  }
}
