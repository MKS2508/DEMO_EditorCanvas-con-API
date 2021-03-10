import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fabric } from "fabric";

@Injectable({
  providedIn: 'root'
})
export class ComunicadorService {

  public canvas: fabric.Canvas;
  public selected: fabric.Object;
  public clone: any;

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

  private enviarDelete = new Subject<any>();
  enviarDeleteObservable = this.enviarDelete.asObservable();

  private enviarClone = new Subject<any>();
  enviarCloneObservable = this.enviarClone.asObservable();

  private enviarBringTo = new Subject<Boolean>();
  enviarBringToObservable = this.enviarBringTo.asObservable();
  
  private enviarUnselect = new Subject<any>();
  enviarUnselectObservable = this.enviarUnselect.asObservable();

  enviarMensajeUnselect(unselect: String){
    this.enviarUnselect.next(unselect)
  }

  enviarMensajeClone(clone: any){
  this.enviarClone.next(clone);
  }

  enviarMensajeBringTo(bring: Boolean){
  this.enviarBringTo.next(bring);
   }

  enviarMensajeDeleteAll() {
    this.enviarDeleteAll.next("CLEARED");
  }

  enviarMensajeDelete() {
    this.enviarDelete.next("DELETED");
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
  