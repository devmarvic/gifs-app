import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponseGiphy, Gif } from './../interfaces/gifs.interfaces';

//? este servicio esta totalmente disponible a lo largo de toda la applicacion
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apikeyGiphy: string = 'd7nZvJ6NJF82DjbXN9T8OsqCeIavlCTu';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready!')
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {
    // pasamos el tag a minusculas
    tag.toLowerCase();

    // si el taghistory incluye ese mismo tag, entonces los elimino con nuevo array
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    // lo pongo al inicio
    this._tagsHistory.unshift(tag);
    // lo limito a 10
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    // llamar localstorage
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //* :void es que no regresa nada
  private loadLocalStorage():void{
    if( !localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }

  searchTag( tag: string ):void{
    if(tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikeyGiphy)
      .set('limit', '10')
      .set('q', tag)

    // en Angular, no se suele trabajar con axios ni fetch API
    this.http.get<SearchResponseGiphy>(`${this.serviceUrl}/search`, {params})
    .subscribe( resp => {
      this.gifList = resp.data;
      // console.log({gifs: this.gifList})
    })
  }

}
