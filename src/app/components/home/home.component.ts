import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    // this.spotify. getNewReleases()
    // .subscribe(data => {
    //   this.nuevasCanciones = data;
    //   this.loading = false; }
    //   , (error) => {
    //     this.loading = false;
    //     this.error = true;
    //     this.mensajeError = error.error.error.message;
    // });

    // this.spotify.getToken();



  }

  ngOnInit() {
    this.getNewReleases();
  }
  async getNewReleases() {
    const token = await  this.spotify.getToken();
  //  console.log(this.token);
    (await this.spotify.getNewReleases())
     .subscribe((data: any) => {
      this.loading = false;
      this.nuevasCanciones = data;
     }, (e) => {
      this.loading = false;
      this.error = true;
      this.mensajeError = e.error.error.message;
      console.log(e);
     });
  }



}
