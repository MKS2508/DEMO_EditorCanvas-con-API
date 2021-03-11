import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fabric } from "fabric";
import { CanvasProps } from "../app/CanvasProps";

@Injectable({
  providedIn: 'root'
})
export class ComunicadorService {

    //BLOQUE 1
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

  //BLOQUE 2
  canvasImage : String

  private enviarCanvasImage = new Subject<string>();
  enviarImageObservable = this.enviarCanvasImage.asObservable();

  private enviarLoadCanvasFromDB = new Subject<string>();
  enviarLoadCanvasObs = this.enviarLoadCanvasFromDB.asObservable();

  private enviarSentCanvasToDB = new Subject<string>();
   enviarSentCanvasObs = this.enviarSentCanvasToDB.asObservable();

  // 3
  public props: CanvasProps
  private enviarProps = new Subject<CanvasProps>();
  enviarPropsObs = this.enviarProps.asObservable();

  private enviarID = new Subject<any>();
  enviarIDObs = this.enviarID.asObservable();

  private enviarNombre = new Subject<any>();
  enviarNombreObs = this.enviarNombre.asObservable();

  private enviarFill = new Subject<any>();
  enviarFillObs = this.enviarFill.asObservable();

  private enviarOpacity = new Subject<any>();
  enviarOpacityObs = this.enviarOpacity.asObservable();
  ///

  enviarMensajeID(id){
    this.enviarID.next(id)
  }

  enviarMensajeFill(fill){
    this.enviarFill.next(fill)
  }

  enviarMensajeOpacity(opacity){
    this.enviarOpacity.next(opacity)
  }

  enviarMensajeNombre(nombre){
    this.enviarNombre.next(nombre)
  }

  enviarMensajeProps(props: CanvasProps){
    this.props = props;
    this.enviarProps.next(props)
  }
  /// 
  enviarMensajeCanvasImage(img:string){
    this.canvasImage = img;
    this.enviarCanvasImage.next(img)
  }

  enviarMensajeLoadCanvas(){
    this.enviarLoadCanvasFromDB.next("LOADED");
  }

  
  enviarMensajeSentCanvas(){
    this.enviarSentCanvasToDB.next("SAVED");
  }




  //

  //


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
  