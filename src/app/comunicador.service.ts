import {EventEmitter, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { fabric } from "fabric";
import { CanvasProps } from "../app/CanvasProps";
import {ObjProps} from "./obj-props";

@Injectable({
  providedIn: 'root'
})
export class ComunicadorService {

  mostrar: boolean;


  constructor() { }


 //BLOQUE 1: mostrar/ocultar menu centros
  private mostrarEmitter = new EventEmitter<boolean>();
  recibirMostrarObs = this.mostrarEmitter.asObservable();

  private seleccionarCentroEmitter = new EventEmitter<number>();
  recibirCentroObs = this.seleccionarCentroEmitter.asObservable();

  enviarMostrar(mostrar: boolean){
    this.mostrarEmitter.next(mostrar);
  }

  enviarCentro(centroID: number){
  this.seleccionarCentroEmitter.emit(centroID);
  }
  // FIN 1

//BLOQUE 2: Canvas
  private canvasEmitter = new EventEmitter<fabric.Canvas>();
  recibirCanvasObs = this.canvasEmitter.asObservable();

  private selectedEmitter = new EventEmitter<ObjProps>();
  recibirSelectedObs = this.selectedEmitter.asObservable()

  enviarSelected(obj: ObjProps){
    console.error(obj)
    this.selectedEmitter.emit(obj)
  }

  enviarCanvas(canvas: fabric.Canvas){
    this.canvasEmitter.emit(canvas
    )
    //hoy he estado haciendo el front para el menu de los centros CRUD y
  }
}
