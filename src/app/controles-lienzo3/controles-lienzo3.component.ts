import { Component, OnInit, ViewChild } from "@angular/core";
import { EditorLienzoComponent } from "../editor-lienzo/editor-lienzo.component";
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from '../canvas.service';
import * as fabric from "fabric/fabric-impl";
@Component({
  selector: 'app-controles-lienzo3',
  templateUrl: './controles-lienzo3.component.html',
  styleUrls: ['./controles-lienzo3.component.scss']
})
export class ControlesLienzo3Component implements OnInit {






  public lienzos = []; //lista objetos 


  constructor(private lienzoService : CanvasService){
  
  }
  ngOnInit(): void {
    this.lienzoService.getLienzos().subscribe(data => {this.lienzos = data, console.log(data)});
    console.log(this.lienzos.length)
  }

      
  @ViewChild("canvas", { static: false }) canvas: EditorLienzoComponent;





  public loadCanvasFromMocks(mock: string): void{ //METODO PARA PROBAR, **BORRAR DE AQUI**

  console.log("N LIENZOS == "+this.lienzos.length)
    if (mock === "Aula 1") {
      this.canvas.loadCanvasFromMocks(this.lienzos);
    } else if (mock === "Aula 2") {
      this.canvas.loadCanvasFromMocks(this.lienzos);
    } else if (mock === "Aula 3") {
      this.canvas.loadCanvasFromMocks(this.lienzos);
    }
  }

  public saveCanvasToDB(): void {
    this.canvas.saveCanvasToDB();
  }

  public confirmClear(): void {
    this.canvas.confirmClear();
  }

  public changeSize(): void {
    this.canvas.changeSize();
  }




  randomId() {
    return Math.floor(Math.random() * 999999) + 1;
  } // 

  public removeSelected(): void {//METODO PARA PROBAR, **BORRAR DE AQUI* 
    this.canvas.removeSelected();
    this.lienzos = null;
    this.lienzoService.getLienzos().subscribe(data => this.lienzos = data);
  }

  public sendToBack(): void {
    this.canvas.sendToBack();
  }

  public bringToFront():void {
    this.canvas.bringToFront();
  }

  public clone():void {
    this.canvas.clone();
  }

  public cleanSelect():void {
    this.canvas.cleanSelect();
  }

  public setCanvasFill():void {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage():void {
    this.canvas.setCanvasImage();
  }

  public setId():void {
    this.canvas.setId();
  }

  public setOpacity():void {
    this.canvas.setOpacity();
  }

  public setFill():void {
    this.canvas.setFill();
  }

}
