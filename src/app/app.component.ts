import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ConfigService} from './config/config.service';

declare var H: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private configService: ConfigService) {
    this.platform = new H.service.Platform({
      // apikey: 'GQHnOE74l4clfOvDybZeCJos2s3tdywcxl48JrANEn4'
      apikey: 'dhrCM9XfnZWtcK0YIDzj3LEmX_YLRMQ6gQjIdlIaobY',
    });
  }

  @ViewChild('map')
  public mapElement: ElementRef;

  private platform: any;
  properties = [];

  pinIcon = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<circle cx="16" cy="16" r="16" fill="#E8A746"/>\n' +
    '<circle cx="16" cy="16" r="16" fill="#BBC2B9"/>\n' +
    '<g clip-path="url(#clip0)">\n' +
    '<path d="M20.6695 15.4973L19.3637 14.1915C19.354 14.1818 19.3464 14.1703 19.3411 14.1577C19.3359 14.145 19.3332 14.1314 19.3333 14.1178V11.6253C19.3333 11.5147 19.2894 11.4088 19.2113 11.3306C19.1331 11.2525 19.0271 11.2086 18.9166 11.2086H17.6666C17.5561 11.2086 17.4501 11.2525 17.372 11.3306C17.2939 11.4088 17.25 11.5147 17.25 11.6253V11.8261C17.25 11.8467 17.2439 11.8669 17.2325 11.8841C17.221 11.9012 17.2047 11.9146 17.1857 11.9225C17.1666 11.9304 17.1457 11.9325 17.1254 11.9284C17.1052 11.9244 17.0866 11.9144 17.072 11.8998L16.0862 10.914C16.0081 10.8359 15.9021 10.792 15.7916 10.792C15.6811 10.792 15.5752 10.8359 15.497 10.914L10.9137 15.4973C10.8555 15.5556 10.8158 15.6298 10.7997 15.7107C10.7836 15.7915 10.7919 15.8752 10.8234 15.9514C10.855 16.0275 10.9084 16.0926 10.9769 16.1383C11.0454 16.1841 11.1259 16.2086 11.2083 16.2086H11.7291C11.7568 16.2086 11.7833 16.2196 11.8028 16.2391C11.8223 16.2586 11.8333 16.2851 11.8333 16.3128V20.3753C11.8333 20.4858 11.8772 20.5917 11.9553 20.6699C12.0335 20.748 12.1395 20.7919 12.25 20.7919H14.6458C14.6734 20.7919 14.6999 20.7809 14.7195 20.7614C14.739 20.7419 14.75 20.7154 14.75 20.6878V18.7086C14.75 18.4323 14.8597 18.1674 15.0551 17.972C15.2504 17.7767 15.5154 17.6669 15.7916 17.6669C16.0679 17.6669 16.3328 17.7767 16.5282 17.972C16.7235 18.1674 16.8333 18.4323 16.8333 18.7086V20.6878C16.8333 20.7154 16.8443 20.7419 16.8638 20.7614C16.8833 20.7809 16.9098 20.7919 16.9375 20.7919H19.3333C19.4438 20.7919 19.5498 20.748 19.6279 20.6699C19.7061 20.5917 19.75 20.4858 19.75 20.3753V16.3128C19.75 16.2851 19.7609 16.2586 19.7805 16.2391C19.8 16.2196 19.8265 16.2086 19.8541 16.2086H20.375C20.4574 16.2086 20.5379 16.1841 20.6064 16.1383C20.6749 16.0926 20.7283 16.0275 20.7598 15.9514C20.7914 15.8752 20.7996 15.7915 20.7835 15.7107C20.7675 15.6298 20.7278 15.5556 20.6695 15.4973Z" fill="white"/>\n' +
    '</g>\n' +
    '<defs>\n' +
    '<clipPath id="clip0">\n' +
    '<rect x="11" y="11" width="10" height="10" fill="white"/>\n' +
    '</clipPath>\n' +
    '</defs>\n' +
    '</svg>\n';

  ngAfterViewInit(): void {
    const defaultLayers = this.platform.createDefaultLayers();
    const map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: {lat: 37.7397, lng: -121.4252}
      }
    );
    this.getData(map);
  }

  async getData(map): Promise<void> {
    const responseDate = await this.configService.getProperties(37.7397, -121.4252).toPromise();
    this.properties = responseDate.results;
    console.log('responseDate', responseDate);
    for (let i = 0; i < responseDate.results; i++) {
      const element = responseDate.results[i];
      const parisMarker = new H.map.Marker({
        lat: element.geopoint.coordinates[1],
        lng: element.geopoint.coordinates[0]
      }, {icon: new H.map.Icon(this.pinIcon)});
      parisMarker.addEventListener('tap', (event) => {
        console.log('event', event);
      });
      map.addObject(parisMarker);
    }
  }
}
