import { Component, OnInit, ViewChild } from "@angular/core";
import { FabricjsEditorComponent } from "projects/angular-editor-fabric-js/src/public-api";
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

  public lienzos = [];


  constructor(private _lienzoService : CanvasService){
  
  }
  ngOnInit(): void {
    this._lienzoService.getLienzos().subscribe(data => {this.lienzos = data, console.log(data)});
    console.log(this.lienzos.length)
  }

      
  @ViewChild("canvas", { static: false }) canvas: FabricjsEditorComponent;





  public loadCanvasFromMocks(mock: string) {

  console.log("N LIENZOS == "+this.lienzos.length)
    if (mock === "Aula 1") {
      this.canvas.loadCanvasFromMocks(this.lienzos);
    } else if (mock === "Aula 2") {
      this.canvas.loadCanvasFromMocks(this.lienzos);
    } else if (mock === "Aula 3") {
      this.canvas.loadCanvasFromMocks(this.lienzos);
    }
  }

  public saveCanvasToDB() {
    this.canvas.saveCanvasToDB();
  }

  public confirmClear() {
    this.canvas.confirmClear();
  }

  public changeSize() {
    this.canvas.changeSize();
  }

  public addFigure() {
    this.canvas.addFigure();
  }

  public removeSelected() {
    this.canvas.removeSelected();
    this.lienzos = null;
    this._lienzoService.getLienzos().subscribe(data => this.lienzos = data);
  }

  public sendToBack() {
    this.canvas.sendToBack();
  }

  public bringToFront() {
    this.canvas.bringToFront();
  }

  public clone() {
    this.canvas.clone();
  }

  public cleanSelect() {
    this.canvas.cleanSelect();
  }

  public setCanvasFill() {
    this.canvas.setCanvasFill();
  }

  public setCanvasImage() {
    this.canvas.setCanvasImage();
  }

  public setId() {
    this.canvas.setId();
  }

  public setOpacity() {
    this.canvas.setOpacity();
  }

  public setFill() {
    this.canvas.setFill();
  }

}
