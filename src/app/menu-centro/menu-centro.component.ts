import { Component, OnInit } from '@angular/core';
import {ComunicadorService} from "../comunicador.service";
import {CentroProps} from "../centro-props";
import {FormControl, FormGroup} from "@angular/forms";
import {CanvasService} from "../canvas.service";
import { CanvasFactory } from '../canvas-factory';

@Component({
  selector: 'app-menu-centro',
  templateUrl: './menu-centro.component.html',
  styleUrls: ['./menu-centro.component.scss']
})
export class MenuCentroComponent implements OnInit {

  public lienzos = []; //lista objetos
  public centro: CentroProps
  public listaCentros: Array<CentroProps>;
  private centroSeleccionadoID: number = 0
  private CanvasFactory: CanvasFactory;

  constructor(private comunicadorService: ComunicadorService, private lienzoService: CanvasService) { }

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
  mostrarNew: boolean = false;

  onSubmit(){
    this.props.id = this.centroForm.value.id;
    this.props.width = this.centroForm.value.width;
    this.props.height = this.centroForm.value.height;
    this.props.canvasImage = this.centroForm.value.canvasImage;
    console.warn(this.props.id)
    this.insertOnBD();
  }

  insertOnBD(){
    this.lienzoService.postCentro(this.props).subscribe(data => {console.log(data)})
  }

  ngOnInit(): void {
    this.CanvasFactory = new CanvasFactory(this.lienzoService, this.comunicadorService);
    this.centro = {
      id:555,
      width:"1000",
      height:"2000",
      canvasImage:"3333",
      idCTRSede:"",
      aulas: []
    }
    this.listaCentros = [this.centro, this.centro, this.centro, this.centro]
    this.lienzoService.getCentros().subscribe(data =>{
      console.log(data)
      this.listaCentros = []
      this.listaCentros = data

    });

  }

  mostrar(bol: boolean){
    console.log('a')
    this.mostrarNew = bol
    if(this.mostrarNew == false){
      // @ts-ignore
      console.log('a')

      this.mostrarNew
      console.log(this.mostrarNew)

    } else {
      // @ts-ignore
      this.mostrarNew == false

    }
  }
  editar(idCentro: number){
    this.comunicadorService.enviarMostrar(true);

    this.comunicadorService.enviarCentro(idCentro);

  }

  eliminarCentro(id: number) {

  }

  visualizar(id: number) {

  }
}
