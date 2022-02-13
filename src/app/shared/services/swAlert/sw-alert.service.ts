import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwAlertService {

  constructor() { }

  swAlert(
    alert:
      'error' |
      'success' |
      'find' |
      'saving'
  ) {
    switch (alert) {
      case 'error':
        Swal.fire({
          icon: 'error',
          title: 'Opss...',
          text: 'Algo deu errado, tente novamente mais tarde'
        })
        break;
      case 'success':
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      break
      case 'find':
        Swal.fire({
          icon: 'info',
          title: 'Buscando',
          text: 'Buscando informações atualizadas',
          showConfirmButton: false,
        })
      break
      case 'saving':
        Swal.fire({
          icon: 'info',
          title: 'Salvando ...',
          showConfirmButton: false,
        })
      break

      default:
        break;
    }
  }
}
