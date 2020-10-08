import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

      token: string;

  constructor(private http: HttpClient) {
  }

  getToken() {
    const  clientId = '919edc163e1649bb8d7091472d2ce316'; // Your client id
    const clientSecret = '5d6e7319b9c34937a62ed9029f67515e'; // Your secret
    const body = new HttpParams()
          .append('grant_type', 'client_credentials')
          .append('client_id', clientId)
          .append('client_secret', clientSecret);
    return  this.http.post('https://accounts.spotify.com/api/token', body)
    .toPromise().then( (token: any) => {
        this.token = `Bearer ${token['access_token']}`;
        // console.log('estoy en el gettoken');
        // console.log(this.token);
      }, (err: any) => {
        console.log(err);
      });
  }
  async  getQuery(query: string)   {
    // console.log('voy al get queriy');
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      Authorization: `${this.token}`
    // Authorization: 'Bearer BQB0V5EbIC6rcsofPELwakkFTdx8N5k497fsT_3Nm5T2gQeUtjSsgmozEIpOmReTRPknBuBYAUkH0NEVE7o'
    });
    return this.http.get(url, { headers });
  }
  async getNewReleases() {
  //  console.log('new release');
  //  console.log(this.token);
   const obs = await this.getQuery('browse/new-releases?limit=20');
   return obs.pipe(map((data: any) => data.albums.items));  
      }

  async getArtistas(termino: string) {
    const obs = await  this.getQuery(`search?q=${ termino }&type=artist&market=pa&limit=15`);
    return obs.pipe( map( data =>  data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
  }

  async getTopTracks(id: string) {
    const obs = await  this.getQuery(`artists/${ id }/top-tracks?country=us`);
    return obs.pipe( map( data =>  data['tracks']));
  }
}
