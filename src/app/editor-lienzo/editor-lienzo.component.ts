import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { fabric } from "fabric";

import { ObjProps } from "src/app/obj-props";

import { CanvasProps } from "src/app/CanvasProps";
import { CanvasService } from "src/app/canvas.service";

import { CanvasFactory } from "src/app/canvas-factory";
import { ComunicadorService } from "../comunicador.service";

@Component({
  selector: "app-editor-lienzo",
  templateUrl: "./editor-lienzo.component.html",
  styleUrls: ["./editor-lienzo.component.scss"],
})
export class EditorLienzoComponent implements AfterViewInit, OnInit {
  @ViewChild("htmlCanvas") htmlCanvas: ElementRef;

  CanvasFactory: CanvasFactory = null;
  public canvas: fabric.Canvas;
  public props: CanvasProps;
  private objeto1: ObjProps;
  public size: any;

  ngOnInit(): void {
    this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService);
    this.props = this.CanvasFactory.props;
    this.objeto1 = this.CanvasFactory.objetoBD;
    this.size = this.CanvasFactory.size;
    this.actualizar();


  }

  public url: string | ArrayBuffer = "";

  public textEditor: boolean = false;

  public figureEditor: boolean = false;

  public selected: fabric.Object;

  lienzos: any

  constructor(
    private lienzoService: CanvasService,
    private ref: ChangeDetectorRef, 
    private comunicadorService: ComunicadorService

  ) {}

  ngAfterViewInit(): void {
    // setup front side canvas
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      hoverCursor: "pointer",
      selection: true,
      selectionBorderColor: "blue",
    });


    let seleccionado: String = this.CanvasFactory.seleccionado;
    this.canvas.on({
      "object:moving": (e) => {},
      "object:modified": (e) => {},
      "object:selected": (e) => {
        const selectedObject = e.target;
        this.selected = selectedObject;
        selectedObject.hasRotatingPoint = true;
        selectedObject.transparentCorners = false;
        selectedObject.cornerColor = "red";
        
        this.resetPanels();

        if (selectedObject.type !== "group" && selectedObject) {
          this.getId();
          this.getOpacity();
        }
      },
      "selection:cleared": (e) => {
        this.selected = null;
        this.resetPanels();
      },
    });

    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
    // get references to the html canvas element & its context
    this.canvas.on("mouse:down", (e) => {
      const canvasElement: any = document.getElementById("canvas");
    });
    // console.error("CANVAS - "+ this.canvas)
    this.comunicadorService.enviarMensajeCanvas(this.canvas);
    this.setCanvasImage();

  }

  actualizar(){
    console.warn("SIZE ES : " + this.size.width)

    this.comunicadorService.enviarMensajeSize(this.size)
    this.comunicadorService.enviarMensaje(this.size)
    this.comunicadorService.enviarSizeObservable.subscribe(data => {console.warn(data.width + "edITOR" + this.size.width), this.size = data, this.changeSize()});
    this.comunicadorService.enviarMensajeObservable.subscribe(data => {console.warn(data), this.addFigure()})
    this.comunicadorService.enviarDeleteAllObservable.subscribe(data => {console.warn(data), this.confirmClear()})
    this.comunicadorService.enviarCloneObservable.subscribe(data =>{console.warn(data), this.clone()})
    this.comunicadorService.enviarDeleteObservable.subscribe(data => {console.warn(data), this.removeSelected()})
    this.comunicadorService.enviarBringToObservable.subscribe(data => {console.warn(data), this.bringTo(data)})
    this.comunicadorService.enviarUnselectObservable.subscribe(data => {console.warn(data), this.cleanSelect()})

    this.comunicadorService.enviarImageObservable.subscribe(data => {console.warn(data), this.props.canvasImage = data, this.setCanvasImage()})
    this.comunicadorService.enviarLoadCanvasObs.subscribe(data => {console.warn(data), this.lienzoService.getLienzos().subscribe(data2 => {console.warn(data2),this.lienzos = data2 ,this.loadCanvasFromMocks(this.lienzos)})})
    this.comunicadorService.enviarSentCanvasObs.subscribe(data => {console.warn(data), this.saveCanvasToDB()})

    this.comunicadorService.enviarIDObs.subscribe(data => {console.warn(data), this.props.id = data, this.setIdParam(data)})
    this.comunicadorService.enviarNombreObs.subscribe(data => {console.warn(data), this.props.nombre = data, this.setNameParam(data)})
    this.comunicadorService.enviarFillObs.subscribe(data => {console.warn(data), this.props.fill = data, this.setFillParam(data)})
    this.comunicadorService.enviarOpacityObs.subscribe(data => {console.warn(data), this.props.opacity = 1, this.setOpacityParam(1)})

  }


  bringTo(bol: Boolean){
    if(bol == true){
      this.sendToBack()
    } else{
      this.bringToFront()
    }
  }

  changeSize(): void {
    // tamanio canvas
    this.canvas.setWidth(this.size.width);
    this.canvas.setHeight(this.size.height);
  }

  addFigure(): void {
    // agregar rectangulo nuevo
    this.CanvasFactory.addFigure();
  }

  addFigureParam(Objeto: ObjProps): void {
    this.CanvasFactory.addFigureParam(Objeto);
  }

  cleanSelect(): void {
    this.canvas.discardActiveObject().renderAll();
  } //des-seleccion

  selectItemAfterAdded(obj): void {
    this.CanvasFactory.selectItemAfterAdded(obj);
  } //se utiliza despues de pintar un obj

  setCanvasFill(): void {
    if (!this.props.canvasImage) {
      this.canvas.backgroundColor = this.props.canvasFill;
      this.canvas.renderAll();
    }
  } // color relleno

  extend(obj: any, id: number, nombre: string, cnvIMG: string): void {
    this.CanvasFactory.extend(obj, id, nombre, cnvIMG);
  } // este metodo extiende el objeto del canvas con los parametros extra (ID, name...)

  setCanvasImage(): void {
    this.CanvasFactory.setCanvasImage();
  } // este metodo settea la imagen de fondo del lienzo

  setCanvasImageParam(cnvImg: string): void {
    this.CanvasFactory.setCanvasImageParam(cnvImg);
  } // este metodo settea la imagen de fondo del lienzo, cuando la recuperamos de BD

  randomId(): number {
    return this.CanvasFactory.randomId();
  }

  //getter y setter estilo canvas
  getActiveStyle(styleName, object): any {
    this.CanvasFactory.getActiveStyle(styleName, object);
  }

  setActiveStyle(
    styleName,
    value: string | number,
    object: fabric.IText
  ): void {
    this.CanvasFactory.setActiveStyle(styleName, value, object);
  }

  //clonar obj
  clone(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      let clone;

      clone = new fabric.Rect(activeObject.toObject());

      if (clone) {
        clone.set({ left: 10, top: 10 });
        this.canvas.add(clone);
        this.selectItemAfterAdded(clone);
      }
    }
  }

  seleccionado(){
    this.comunicadorService.enviarSelectedObservable.subscribe(data => {console.warn("SELECCIONADO "+data.id), this.selected = data})
    this.comunicadorService.enviarMensajeSelected(this.selected)
  }

  //getter y setter
  getId(): void {
    this.seleccionado()
    const activeObject = this.canvas.getActiveObject()
    this.selected = activeObject
    this.comunicadorService.enviarMensajeSelected(this.selected)
    console.warn("SELCCIONADO"+ activeObject)
    console.log("SIZE DEL CANVAS :" + this.canvas.size());
    this.props.id = this.canvas.getActiveObject().toObject().id;
    this.props.nombre = this.canvas.getActiveObject().toObject().nombre;
    this.props.fill = this.canvas.getActiveObject().toObject().fill;
    this.props.opacity = this.canvas.getActiveObject().toObject().opacity;
    console.warn("getID OPACITY"+ this.props.opacity)
    this.setOpacityParam(1)
    this.setOpacity()
    this.setFill()

    console.log("GET ID ACTIVADO 2 -->" + this.props.id);
    console.log("GET NOMBRE ACTIVADO 2 -->" + this.props.nombre);
    this.comunicadorService.enviarMensajeID(this.props.id)
    this.comunicadorService.enviarMensajeNombre(this.props.nombre)
    this.comunicadorService.enviarMensajeFill(this.props.fill);
    this.comunicadorService.enviarMensajeOpacity(this.props.opacity);
    
  }

  setId(): void {
    const valID: number = this.props.id;
    const valNombre: string = this.props.nombre;
    const valcnv: string = this.props.canvasImage;
    const complete = this.canvas
      .getActiveObject()
      .toObject(["id", "nombre", "cnvIMG"]);
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = valID;
      complete.nombre = valNombre;
      complete.cnvIMG = valcnv;
      return complete;
    };
  }

  setIdParam(id): void {
    const valID: number = id;
    const valNombre: string = this.props.nombre;
    const valcnv: string = this.props.canvasImage;
    const complete = this.canvas
      .getActiveObject()
      .toObject(["id", "nombre", "cnvIMG"]);
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = valID;
      complete.nombre = valNombre;
      complete.cnvIMG = valcnv;
      return complete;
    };
  }

  setNameParam(name): void {
    const valID: number = this.props.id;
    const valNombre: string = name;
    const valcnv: string = this.props.canvasImage;
    const complete = this.canvas
      .getActiveObject()
      .toObject(["id", "nombre", "cnvIMG"]);
    console.log(complete);
    this.canvas.getActiveObject().toObject = () => {
      complete.id = valID;
      complete.nombre = valNombre;
      complete.cnvIMG = valcnv;
      return complete;
    };
  }


  getOpacity(): void {
    this.props.opacity = this.getActiveStyle("opacity", null) * 100;
  }

  setOpacity(): void {
    this.setActiveStyle(
      "opacity",
      parseInt(this.props.opacity, 10) / 100,
      null
    );
  }

  setOpacityParam(opacity): void {
    this.setActiveStyle(
      "opacity",
      parseInt(opacity, 10) ,
      null
    );
  }

  getFill(): void {
    this.props.fill = this.getActiveStyle("fill", null);
  }

  setFill(): void {
    this.setActiveStyle("fill", this.props.fill, null);
  }

  setFillParam(fill): void {
    this.setActiveStyle("fill", fill, null);
  }

  removeSelected(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();
    const activeId = this.canvas
      .getActiveObject()
      .toDatalessObject(["id", "nombre", "CNVIMG"]).id;
    if (activeObject) {
      this.canvas.remove(activeObject);
      // this.textString = '';
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      const self = this;
      activeGroup.forEach((object) => {
        self.canvas.remove(object);
      });
    }
    this.deleteCanvasFromDB(activeId);
  } // eliminar bd el seleccionado

  bringToFront(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      activeObject.bringToFront();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.bringToFront();
      });
    }
  } //traer figura al frente, superponer encima de otra

  sendToBack(): void {
    const activeObject = this.canvas.getActiveObject();
    const activeGroup = this.canvas.getActiveObjects();

    if (activeObject) {
      this.canvas.sendToBack(activeObject);
      activeObject.sendToBack();
      activeObject.opacity = 1;
    } else if (activeGroup) {
      this.canvas.discardActiveObject();
      activeGroup.forEach((object) => {
        object.sendToBack();
      });
    }
  } // el contrario del metodo anterior

  confirmClear(): void {
    if (confirm("Se va a eliminar el lienzo")) {
      this.canvas.clear();
    }
  }
  //limpia el lienzo entero, no los borra de la bd

  resetPanels(): void {
    this.figureEditor = false;
  }

  findByID(id: string): boolean {
    return this.CanvasFactory.existe(id);
  } // encontrar por id, comprobar si existe

  saveCanvasToDB(): void {
    let sizeCanvas = this.canvas.size();
    let arrayProps = [];

    // this.canvas.clear();
    for (let i = 0; i <= sizeCanvas - 1; i++) {
      let item = this.canvas
        .item(i)
        .toDatalessObject(["id", "nombre", "cnvIMG"]);
      item.canvasImage = item.cnvIMG;
      console.log("MEDIO " + item.canvasImage);
      if (this.findByID(item.id) === true) {
        //si el canvas existe, actualiza, si se cambia el id, borra y pinta
        this.updateCanvasFromDB(item);
        console.log("EXISTE, ACTUALIZANDO");
      } else {
        this.lienzoService
          .postLienzo(item)
          .subscribe((data) => console.log(data));
        console.log("NO EXISTE, CREANDO");
      }
    }
  } //guardar en bd

  deleteCanvasFromDB(id: number): void {
    this.CanvasFactory.deleteCanvasFromDB(id);
  } //eliminar elemento de la bd, se llama desde removeSelected

  updateCanvasFromDB(obj: ObjProps): void {
    this.CanvasFactory.updateCanvasFromDB(obj);
  } // update

  loadCanvasFromMocks(mock: ObjProps[]): void {
    let longitudObjetos = mock.length;
    this.confirmClear();

    for (let i = 0; i <= longitudObjetos - 1; i++) {
      this.addFigureParam(mock[i]);
      console.log("cnvimg" + mock[i].canvasImage);
      this.canvas.item(0).toDatalessObject().canvasImage = mock[i].canvasImage;
      console.log(
        "cnvimg" + this.canvas.item(0).toDatalessObject().canvasImage
      );
      this.setCanvasImageParam(mock[i].canvasImage);
      this.props.canvasImage = mock[i].canvasImage;
      console.log("propsIMG  " + this.props.canvasImage);
      this.setCanvasImage();
      this.canvas.renderAll();
      this.selectItemAfterAdded(this.canvas.item(0));
    }
    this.canvas.setWidth(0);
    this.canvas.setWidth(1140);
    this.ref.detectChanges();
  } // cargar desde bd
}
