import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  btnText = "Neues Produkt";
  btnClassList = "btn btn-primary";
  path = "";

  ngOnInit() {
    this.path = "";
    if(this.path === ""){
      this.btnText = "Zurück zur Übersicht";
    }else{
      this.btnText = "Neues Produkt";
    }
  }
}
