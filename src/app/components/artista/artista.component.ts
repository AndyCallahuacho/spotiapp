import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent {

  artista: any = {};
  id: string;
  loading: boolean;
  topTracks: any[] = [];
  error: boolean;
  mensajeError: string;
  constructor(private router: ActivatedRoute,
              private spotify: SpotifyService ) {

    this.loading = true;
    this.router.params.subscribe( params => this.id = params.id);
  //   this.spotify.getArtista(this.id)
  //   .subscribe( artista =>
  //     {
  //     this.artista = artista;
  //     this.loading = false;
  //     }
  //     , (error) => {
  //     this.loading = false;
  //     this.error = true;
  //     this.mensajeError = error.error.error.message;
  //     });

  //   this.spotify.getTopTracks(this.id).subscribe( topTracks => {this.topTracks = topTracks; console.log(topTracks);
  //   }, (error) => {
  //     this.loading = false;
  //     this.error = true;
  //     this.mensajeError = error.error.error.message;
  // });

  }
  ngAfterContentInit() {
    this.getArtista(this.id);
    this.getTopTracks(this.id);
  }

  async getArtista(id: string) {
    const token = await  this.spotify.getToken();
  //  console.log(this.token);
    (await this.spotify.getArtista(this.id))
    .subscribe( artista =>
          {
          this.artista = artista;
          this.loading = false;
          }
          , (error) => {
          this.loading = false;
          this.error = true;
          this.mensajeError = error.error.error.message;
          });
  }

  async getTopTracks(id: string) {
    const token = await  this.spotify.getToken();
  //  console.log(this.token);
    (await this.spotify.getTopTracks(this.id))
    .subscribe( topTracks =>
          {
          this.topTracks = topTracks;
          this.loading = false;
          }
          , (error) => {
          this.loading = false;
          this.error = true;
          this.mensajeError = error.error.error.message;
          });
  }
}

