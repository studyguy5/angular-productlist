import { Component, inject } from '@angular/core';
import { Products } from '../../services/products';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductDetail } from '../product-detail/product-detail';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.scss',
})
export class ProductEdit {

  // router = inject(ProductDetail)
  productService = inject(Products)
  router = inject(Router);
  editForm = new FormGroup({
    name: new FormControl(this.getProduct().name, { validators: [Validators.required, Validators.minLength(3)] }),
    description: new FormControl(this.getProduct().description),
    stock: new FormControl(this.getProduct().stock, { validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl(this.getProduct().price, { validators: [Validators.required, Validators.min(0)] })
})


  getProduct() {
    const detail = this.productService.productDetail();
    return {
      name: detail.name,
      description: detail.description,
      stock: detail.stock,
      price: detail.price
    }
  }

  onsubmit() {
    if(this.editForm.invalid) return;
    console.log(this.editForm.value);
  
    let product: Product = {
      name: this.editForm.value.name ? this.editForm.value.name : 'n/a',
      description: this.editForm.value.description ? this.editForm.value.description : 'n/a',
      specs: "",
      stock: this.editForm.value.stock ? this.editForm.value.stock : 0,
      price: this.editForm.value.price ? this.editForm.value.price : 0
    }
    this.productService.addProduct(product);
    this.router.navigate(['']);
  }
}

