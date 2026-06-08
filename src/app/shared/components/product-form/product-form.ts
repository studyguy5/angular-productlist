import { Component, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})

export class ProductForm {

  router = inject(Router);
  productService = inject(Products);
  productForm = new FormGroup({
    name: new FormControl('n/a', { validators: [Validators.required, Validators.minLength(3)] }),
    description: new FormControl('n/a'),
    stock: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl(0, { validators: [Validators.required, Validators.min(0)] })
})

onsubmit() {
  if(this.productForm.invalid) return;
  console.log(this.productForm.value);

  let product: Product = {
    id: 0,
    name: this.productForm.value.name ? this.productForm.value.name : 'n/a',
    description: this.productForm.value.description ? this.productForm.value.description : 'n/a',
    specs: "",
    stock: this.productForm.value.stock ? this.productForm.value.stock : 0,
    price: this.productForm.value.price ? this.productForm.value.price : 0
  }
  this.productService.addProduct(product);
  this.router.navigate(['']);
}



};
