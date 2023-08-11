import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  // nos sirve para poder tener una referencia local
  @ViewChild('txtTagInput')
  //? puede ser nulo? no: not null operator : siempreValor!
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private GifsService: GifsService){}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    console.log({newTag})

    this.GifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
