import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { CurrencyPipe } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import { Products } from '../../services/products';

// hier custom Pipe erstellen
// hier importiere die Funktionalitäten Pipe und PipeTransform von angualar/core, damit ich eine Pipe erstellen und sie ändern kann
// mit dem implements füge ich der klasse die extra nativen angular tools hinzu und sage
// der eingehende Value soll auf 2 Nachkommastellen gerundet werden und ein Währungssymbol returned werden
// der Name in Pipe wird im Html verwendet, der Klassennamen muss in app.ts unter imports definiert werden
@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode: string): string {
    return value.toFixed(2) + ' ' + currencyCode;
  }
}
@Component({
  selector: 'app-product-list',
  imports: [ RouterLink, CustomCurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  providers: [Products]
})



export class ProductList {
  public productlist = inject(Products);
  list = this.productlist.productlist;
}
