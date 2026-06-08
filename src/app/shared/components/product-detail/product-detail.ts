import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';
@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  providers: [Products]
})

export class ProductDetail {
private route = inject(ActivatedRoute);
productservice = inject(Products);






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
    
  }
}
