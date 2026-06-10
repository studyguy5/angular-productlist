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
  let currentid: number = Number(this.route.snapshot.paramMap.get('id'))
  if(currentid){
    this.productservice.setProductDetailByid(currentid);
    
  }
  };
  detail = this.productservice.productDetail;

  async deleteDetail(){  
  this.productservice.deleteProduct(this.detail().id);
  
  this.router.navigate(['']);
  }

  editProduct(){
    this.router.navigate(['editform']);
  }
}
