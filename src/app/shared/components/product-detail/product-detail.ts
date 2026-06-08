import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  // providers: [Products]
})

export class ProductDetail {
private route = inject(ActivatedRoute);
productservice = inject(Products);
router = inject(Router);






ngOnInit() {
  let currentName = this.route.snapshot.paramMap.get('name') || "";
  if(currentName){
    this.productservice.setProductDetailByName(currentName);
    
  }
  };
  detail = this.productservice.productDetail;

  deleteDetail(){
    this.detail.update(p => ({ ...p, name: "" }));
  }

  editProduct(){
    this.router.navigate(['editform']);
  }
}
