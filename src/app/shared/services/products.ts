import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { createClient } from '@supabase/supabase-js'
import { RealtimeChannel } from '@supabase/supabase-js';
import { ProductModel } from '../models/productmodels';


@Injectable({
  providedIn: 'root',
})
export class Products {

  productlistInsertChannel;
  productlistDeleteChannel;
  productlistUpdateChannel;
  // superbase function to connect and to live update==========================================================================
  channel: RealtimeChannel | undefined
  // Create a single supabase client for interacting with your database
  supabase = createClient('https://jhalmxasnqoxubitftsl.supabase.co', 'sb_publishable_xqmPPkgnlRFfAbZbsmWNTg_cmrFXuty')

  async getProducts() {
    let { data: productlist, error } = await this.supabase
      .from('products')
      .select('*')
    console.log(productlist);
    if (!productlist) return
    this.productlist.set(productlist)
  }

  setRealtimeChannel() {
    if (this.supabase) {
      this.channel = this.supabase.channel('custom-all-channel')
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'products' }, () => {
            this.getProducts()
          }).subscribe()
    }
  }
  constructor() {
    this.getProducts();
    this.setRealtimeChannel();

    this.productlistInsertChannel = this.supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products' },
        (payload) => {
          let tmpProduct = new ProductModel(payload.new);
          this.productlist.update(p => [...p, tmpProduct]);
        }
      )
      .subscribe()



    this.productlistDeleteChannel = this.supabase.channel('custom-delete-channel')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'products' },
        (payload) => {
          console.log('Change received!', payload)
          let tmpProductID = payload.old['id'];
          this.productlist.update(p => p.filter(p => p.id !== tmpProductID));
        }
      )
      .subscribe()


    this.productlistUpdateChannel = this.supabase.channel('custom-update-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'products' },
        (payload) => {
          console.log('Change received!', payload)
          let tmpProductID = payload.new['id'];
          this.productlist.update(tmpProductID);
        }
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.productlistInsertChannel);
    this.supabase.removeChannel(this.productlistDeleteChannel);
    this.supabase.removeChannel(this.productlistUpdateChannel);
  }

  async deleteProduct(id: number) {
    const { error } = await this.supabase
      .from('products')
      .delete()
      .eq('id', id)
  }
  // ============================================================================================================================
  // productDetail: Product = {
  //   name: "",
  //   description: "",
  //   specs: "",
  //   stock: 0,
  //   price: 0
  // }



  productDetail = signal<Product>({
    id: 0,
    name: "",
    description: "n",
    specs: "",
    stock: 0,
    price: 0
  })

  async addProduct(product: ProductModel) {
    const product_data = product.getCleanJson();
    const { data, error } = await this.supabase
      .from('products')
      .insert([
        product_data,
      ])
      .select()

  }

  async editOneProduct(product: Product) {
    let productExists: number = this.productlist().findIndex(p => p.id === product.id);
    const { data, error } = await this.supabase
      .from('products')
      .update([
        // {data:
        // this.productDetail()}
        {
          name: product.name,
          description: product.description,
          specs: product.specs,
          stock: product.stock,
          price: product.price
        }
      ])
      .eq('id', product.id)
    // if (productExists !== -1) {
    //   this.productlist.update(list => list.map((p, index) => index === productExists ? product : p));
    // }
    // this.productlist.update(p => [...p, product]);
  }

  setProductDetailByid(id: number): void {
    let tmpProduct = this.productlist().find(p => p.id == id);
    if (tmpProduct) {
      this.productDetail.set(tmpProduct);
    }
  }

  productlist = signal<Product[]>([]);


}
