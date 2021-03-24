import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { ObjProps } from "./obj-props";
import {CentroProps} from "./centro-props";

@Injectable()
export class CanvasService {
    objetoBD: ObjProps;

    constructor(private http: HttpClient) {}

    private url: string =  "http://localhost:8080/centro/";
    private url2: string = "http://localhost:8080/centro/";
    private url3: string = "http://localhost:8080/lienzo/";
    private url4: string = "http://localhost:8080/centro/888/aula/";
  private url5: string = "http://localhost:8080/lienzos/";



  getCentro(idCentro: number): Observable<CentroProps> {
        return this.http.get<CentroProps>(this.url+idCentro);
    }

  addToCentro(idCentro: number, idObj: number): Observable<CentroProps> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };
    return this.http.put<CentroProps>(this.url4+idObj, httpOptions);
    console.log("ADDED")
  }

    postLienzo(newObject: ObjProps): Observable<ObjProps> {
    console.warn("left "+newObject.left_canvas)
        return this.http.post<ObjProps>(this.url3, newObject);
    }

    updateLienzo(object: any): Observable<ObjProps>{
    let httpParams = new HttpParams()
      .set('id', object.id);
    httpParams.set('nombre', object.nombre);
    httpParams.set('width',object.width);
    httpParams.set('height',object.height);
    httpParams.set('left_canvas', object.left_canvas);
    httpParams.set('top_canvas', object.top_canvas);
    httpParams.set('angle', object.angle);
    httpParams.set('fill', object.fill);
    httpParams.set('opacity', object.opacity);
    httpParams.set('scaleX', object.scaleX);
    httpParams.set('scaleY', object.scaleY)
    const httpOptions = {
      params: httpParams,
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    };


    return this.http.put<ObjProps>(this.url3+object.id, httpOptions);

  }
    deleteLienzo(idObject: number): Observable<ObjProps>{

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
          };


         return this.http.delete<ObjProps>(this.url3+idObject, httpOptions);

    }

    updateCentro(object: CentroProps): Observable<CentroProps>{
    console.log(object)
      this.postLienzo(object.aulas[0])
      this.updateLienzo(object.aulas[1])
      this.updateLienzo(object.aulas[2])
      this.updateLienzo(object.aulas[3])

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      };
         return this.http.put<CentroProps>(this.url2+object.id, object, httpOptions);

    }

  postCentro(object: CentroProps): Observable<CentroProps>{
    return this.http.post<CentroProps>(this.url2+object.id, object);
  }

    findLienzo(id: any): Observable<ObjProps>{
        return this.http.get<ObjProps>(this.url5+id);

    }


}

