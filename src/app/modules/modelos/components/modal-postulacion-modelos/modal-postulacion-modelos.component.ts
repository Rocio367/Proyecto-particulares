import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { ModelosService } from "src/app/core/services/modelos/modelos.service";
import { OfertaDeResolucion } from "src/app/shared/models/oferta-de-resolucion";
import { TipoDeDemora } from "src/app/shared/models/tipo-de-demora";
import { TipoDeResolucion } from "src/app/shared/models/tipo-de-resolucion";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-modal-postulacion-modelos",
  templateUrl: "./modal-postulacion-modelos.component.html",
  styleUrls: ["./modal-postulacion-modelos.component.scss"],
})
export class ModalPostulacionModelosComponent implements OnInit {
  tiposResolucion: TipoDeResolucion[];
  tiposDeDemoras: TipoDeDemora[];

  formularioDePostulacion: FormGroup;

  idModelo: Number;
  idUsuario: Number;

  constructor(
    private form: FormBuilder,
    private router: Router,
    private servicioDeModelo: ModelosService,
    private config: DynamicDialogConfig,
    public snackBar: MatSnackBar
  ) {
    this.formularioDePostulacion = this.form.group({
      tipoDeResolucion: ["", Validators.required],
      tipoDeDemora: ["", Validators.required],
      costo: ["", Validators.required],
    });
    this.idModelo = this.config.data.idModelo;
  }

  ngOnInit(): void {
    this.servicioDeModelo
      .obtenerTiposDeResolucion()
      .subscribe((tiposDeResolicion) => {
        this.tiposResolucion = tiposDeResolicion;
      });
    this.servicioDeModelo.obtenerTiposDeDemora().subscribe((tiposDeDemoras) => {
      this.tiposDeDemoras = tiposDeDemoras;
    });
    this.idUsuario = Number(localStorage.getItem("idUser"));
  }

  confirmar() {
    if (this.formularioDePostulacion.valid) {
      let ofertaDeResolucion: OfertaDeResolucion = {
        tipoResolucion:
          this.formularioDePostulacion.controls["tipoDeResolucion"].value,
        tipoDeDemora:
          this.formularioDePostulacion.controls["tipoDeDemora"].value,
        costo: this.formularioDePostulacion.controls["costo"].value,
        idUsuario: this.idUsuario,
      };

      this.servicioDeModelo
        .ofertarResolucion(ofertaDeResolucion, this.idModelo)
        .subscribe(
          () => {
            this.snackBar.open("Te postulaste con éxito", "", {
              duration: 2000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["green-snackbar"],
            });
          },
          (error) => console.error(error)
        );
    } else {
      this.formularioDePostulacion.markAllAsTouched();
    }
  }
}
