import { Component, OnInit } from '@angular/core';
import {ComunicadorService} from "../comunicador.service";
import {CentroProps} from "../centro-props";
import {FormControl, FormGroup} from "@angular/forms";
import {CanvasService} from "../canvas.service";

@Component({
  selector: 'app-menu-centro',
  templateUrl: './menu-centro.component.html',
  styleUrls: ['./menu-centro.component.scss']
})
export class MenuCentroComponent implements OnInit {

  constructor(private comunicadorService: ComunicadorService, private _lienzoService: CanvasService) { }

 public props: CentroProps = {
    id:0,
    width:"1000",
    height:"2000",
    canvasImage:"",
    idCTRSede:"",
    aulas: []
  }

  centroForm = new FormGroup({
    id: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    canvasImage: new FormControl(''),
  });

  onSubmit(){
    this.props.id = this.centroForm.value.id;
    this.props.width = this.centroForm.value.width;
    this.props.height = this.centroForm.value.height;
    this.props.canvasImage = this.centroForm.value.canvasImage;
    console.warn(this.props.id)
    this.insertOnBD();
  }

  insertOnBD(){
    this._lienzoService.updateCentro(this.props).subscribe(data => {console.log(data)})
  }

  ngOnInit(): void {

  }

  editar(idCentro: number){
  this.comunicadorService.enviarCentro(idCentro);
  this.comunicadorService.enviarMostrar(true);

  }

}
