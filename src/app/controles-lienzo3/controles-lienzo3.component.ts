import { Component, OnInit } from '@angular/core';
import {CanvasService} from "../canvas.service";
import {ComunicadorService} from "../comunicador.service";
import {ObjProps} from "../obj-props";
import {fabric} from "fabric";
import {CanvasFactory} from "../canvas-factory";

@Component({
  selector: 'app-controles-lienzo3',
  templateUrl: './controles-lienzo3.component.html',
  styleUrls: ['./controles-lienzo3.component.scss']
})
export class ControlesLienzo3Component implements OnInit {

  public canvas: fabric.Canvas
  public selected: fabric.Object = new fabric.Object();

  public canvasFactory: CanvasFactory

  public props: ObjProps = {
    id: 0,
    nombre: 'a',
    lienzo: '',
    width: 0,
    height: 0,
    left_canvas: 0,
    top_canvas: 0,
    angle: 0,
    fill: '#ffffff',
    opacity: 0,
    idCTRCentro:'',
    scaleX: 1,
    scaleY: 1
  }
  constructor(private lienzoService: CanvasService, private comunicadorService: ComunicadorService) { }

  ngOnInit(): void {
    this.editorCanvas = false;
    this.comunicadorService.recibirEditorObs.subscribe(data => {
      if (data === true) {
        this.editorCanvas = true;
      } else {
        this.editorCanvas = false;
      }
    });

    this.canvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService)

    this.comunicadorService.recibirCanvasObs.subscribe(data => {
      console.warn("canvas recibido en 3")

      this.canvas = data

     // this.props.opacity = this.selected.toObject().opacity
      // console.log(this.selected.toObject(['id']))

      // console.log(this.selected.toObject())

      // console.log(this.props.opacity)
    });

    this.comunicadorService.recibirSelectedObs.subscribe(data2 =>{
      console.log(data2)
      this.props.id = data2.id
      this.props.nombre = data2.nombre
      this.props.fill = data2.fill
      this.props.opacity = data2.opacity
      this.getOpacity()
      this.getFill()
    });

  }

  getActiveStyle(styleName, object): any {
    object = object || this.canvas.getActiveObject();
    if (!object) {
      return '';
    }

    if (object.getSelectionStyles && object.isEditing) {
      return (object.getSelectionStyles()[styleName] || '');
    } else {
      return (object[styleName] || '');
    }
  }

  setActiveStyle(styleName, value: string | number, object: fabric.IText): void {
    object = object || this.canvas.getActiveObject() as fabric.IText;
    if (!object) {
      return;
    }

    if (object.setSelectionStyles && object.isEditing) {
      const style = {};
      style[styleName] = value;

      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.setSelectionStyles({underline: true});
        } else {
          object.setSelectionStyles({underline: false});
        }

        if (value.includes('overline')) {
          object.setSelectionStyles({overline: true});
        } else {
          object.setSelectionStyles({overline: false});
        }

        if (value.includes('line-through')) {
          object.setSelectionStyles({linethrough: true});
        } else {
          object.setSelectionStyles({linethrough: false});
        }
      }

      object.setSelectionStyles(style);
      object.setCoords();

    } else {
      if (typeof value === 'string') {
        if (value.includes('underline')) {
          object.set('underline', true);
        } else {
          object.set('underline', false);
        }

        if (value.includes('overline')) {
          object.set('overline', true);
        } else {
          object.set('overline', false);
        }

        if (value.includes('line-through')) {
          object.set('linethrough', true);
        } else {
          object.set('linethrough', false);
        }
      }

      object.set(styleName, value);
    }

    object.setCoords();
    this.canvas.renderAll();
  }


  setId() {
    this.comunicadorService.enviarSelected(this.props)
    this.canvasFactory.setId()

  }
  //pasar a factory
  editorCanvas: boolean;
  getFill(): void {
    this.props.fill = this.getActiveStyle('fill', null);
  }

  setFill(): void {
    this.setActiveStyle('fill', this.props.fill, null);
    this.comunicadorService.enviarCanvas(this.canvas)

  }

  getOpacity(): void {
    this.props.opacity = this.getActiveStyle('opacity', null) * 100;
  }

  setOpacity(): void {
    this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
    this.comunicadorService.enviarCanvas(this.canvas)
  }

}
