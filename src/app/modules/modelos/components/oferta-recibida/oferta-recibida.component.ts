import { Component, Input } from "@angular/core";
import { ProductosService } from "src/app/core/services/productos/productos.service";
import { OfertaDeResolucionResponse } from "src/app/shared/models/oferta-resolucion-response";

@Component({
    selector: 'app-oferta-recibida',
    templateUrl: './oferta-recibida.component.html',
    styleUrls: ['./oferta-recibida.component.scss']
  })
  export class OfertaRecibida {
    @Input()
    ofertaDeResolucion: OfertaDeResolucionResponse;
    @Input()
    idAlumno: number
    comprando: boolean = false;
    //Borrar....
    item: any = {};

    constructor(private productosService: ProductosService) {
        this.item.valoracion = 5;
    }

    contratar() {
        this.comprando = true;
        // No entiendo lo del popup... por ahora dejo la llamada al servicio de compra
        // this.dialog.open(ModalContratarModelosComponent, { panelClass: 'custom-dialog-container' });
        const pedidoDeCompra = {
          idUsuario: this.idAlumno
        };
        this.productosService.iniciarCompra(this.ofertaDeResolucion.id, pedidoDeCompra)
          .subscribe((procesoDeCompra) => {
            window.open(procesoDeCompra.urlExterna, "_blank");
            this.comprando = false;
          })
    }
  }