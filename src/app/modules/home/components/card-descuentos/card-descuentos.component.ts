import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/shared/models/card';

@Component({
  selector: 'app-card-descuentos',
  templateUrl: './card-descuentos.component.html',
  styleUrls: ['./card-descuentos.component.scss']
})
export class CardDescuentosComponent implements OnInit {
  beneficios: CardModel[]

  constructor() { }

  ngOnInit(): void {
    this.beneficios = [
      { titulo: 'Pack 20 clases 10%', subtitulo: 'Descuentos', contenido: 'This card has divider and indeterminate progress as footer'},
      { titulo: '20% de descuento', subtitulo: 'Descuentos', contenido: 'Si sos un suscriptor activo de la página durante un año.'},
      { titulo: 'Primer clase GRATIS', subtitulo: 'Descuentos', contenido: 'Podes probar nuestros servicios gratuitamente la primera vez.'}
    ];
  }

}
