import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;
  constructor(private spotify: SpotifyService) {
   }


  async buscar(termino: string){
    // console.log(termino) ;
    this.loading = true;
    const obs = await this.spotify.getArtistas(termino);
    obs.subscribe( data => {
      this.artistas = data;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.error = true;
      this.mensajeError = error.error.error.message;
  });
  }

}
