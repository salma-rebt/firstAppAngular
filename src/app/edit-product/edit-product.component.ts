import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../modele/product.modele";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!: number;
  productFormGroup!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id']; //récupérer le id product choisis pour modif depuis le lien header
    this.productService.getProductsByID(this.productId).subscribe({  // envoi la requete vers le backend
      next: (product) => {            // quand le résultat arrive
       this.productFormGroup = this.fb.group({   // on affiche les données  // formgroupe peut etre null car l'action declenchnate est le choix d'une et ngInit se lance au moment de chargement de composant c pour cela on utilise ngif dans html
         id: this.fb.control(product.id),
         name: this.fb.control(product.name,[Validators.required]),
         price: this.fb.control(product.price,[Validators.min(100)]),
         checked: this.fb.control(product.checked),
       })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  EditProduct() {

    let product : Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next : data => {
        alert(JSON.stringify(data));
      }
    })

  }
}
