import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fabric } from "fabric";

@Injectable({
  providedIn: 'root'
})
export class ComunicadorService {

  public canvas: fabric.Canvas;

  mensaje: String;
  private enviarMensajeSubject = new Subject<String>();
  enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

  private enviarCanvas = new Subject<fabric.Canvas>();
  enviarCanvasObservable = this.enviarCanvas.asObservable();

  private enviarSize = new Subject<any>();
  enviarSizeObservable = this.enviarSize.asObservable();

  private enviarSelected = new Subject<any>();
  enviarSelectedObservable = this.enviarSelected.asObservable();

  private enviarDeleteAll = new Subject<any>();
  enviarDeleteAllObservable = this.enviarDeleteAll.asObservable();
  selected: fabric.Object;

  
  enviarMensajeDeleteAll() {
    this.enviarDeleteAll.next("CLEARED");
  }

  enviarMensajeSelected(selected: any) {
    this.selected = selected;
    this.enviarSelected.next(selected);
  }

  enviarMensaje(mensaje: String) {
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
  }

  enviarMensajeCanvas(mensajeCanvas: fabric.Canvas) {
    this.canvas = mensajeCanvas;
    this.enviarCanvas.next(mensajeCanvas);
  }

  enviarMensajeSize(size: any) {
    console.warn("SAPE" + size.width);
    this.size = size;
    this.enviarSize.next(size);
  }

  

  size = {
    width: 1000,
    height: 800,
  };


}
  