import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { ObjProps } from "src/app/obj-props";

@Injectable()
export class CanvasService {
    objetoBD: ObjProps;

    constructor(private http: HttpClient) {}

    private url: string = "http://localhost:8080/lienzos";
    private url2: string = "http://localhost:8080/lienzo/";




    getLienzos(): Observable<ObjProps[]> {
        return this.http.get<ObjProps[]>(this.url);
    }

    postLienzo(newObject: any): Observable<ObjProps> {
        return this.http.post<ObjProps>(this.url2, newObject);
    }
    deleteLienzo(idObject: number): Observable<ObjProps>{
        let httpParams = new HttpParams().set('id', idObject.toString());

        const httpOptions = {
            params: httpParams,
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
          };
        

         return this.http.delete<ObjProps>(this.url2, httpOptions);
        
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
        httpParams.set('canvasImage', object.canvasImage);
        const httpOptions = {
            params: httpParams,
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
          };
        

         return this.http.put<ObjProps>(this.url2, httpOptions);
        
    }

    findLienzo(id: any): Observable<ObjProps>{
        return this.http.get<ObjProps>(this.url+"/"+id);

    }


}

