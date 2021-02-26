import { Component, OnInit, ViewChild } from "@angular/core";
import { EditorLienzoComponent } from "../app/editor-lienzo/editor-lienzo.component";
// import { OBJETOSPROPS2 } from "./mock-props";
// import { OBJETOSPROPS } from "./mock-props";

import { CanvasService } from './canvas.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit{
  title = "angular-editor-fabric-js";

  public lienzos = []; //lista objetos 


  constructor(private _lienzoService : CanvasService){
  
  }
  ngOnInit(): void {
    this._lienzoService.getLienzos().subscribe(data => {this.lienzos = data, console.log(data)});
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

  public addFigure(): void {
    this.canvas.addFigure();
  }

  public removeSelected(): void {//METODO PARA PROBAR, **BORRAR DE AQUI* 
    this.canvas.removeSelected();
    this.lienzos = null;
    this._lienzoService.getLienzos().subscribe(data => this.lienzos = data);
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
