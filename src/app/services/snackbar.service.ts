import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})


/**
 * @class SnackbarService  la que se utiliza
 * para mostrsr los mensajes success o error de la app
 *
 */
export class SnackbarService {
  /**
   * @param snackbar objeto de la clase MatSnackBar
   */
  constructor(
    public snackbar: MatSnackBar
  ) {
  }
  /**
   * @description funcion para mostrat mensajes mediante el Snackbar component
   * @param message  mensaje a mostrar en pantalla
   * @param delay el tiempo de espera antes de ocultarse
   */
  openSnackBar(message: string, delay: number = 2000) {
    this.snackbar.open(message, 'OK', {
      duration: delay,
    });
  }
}
