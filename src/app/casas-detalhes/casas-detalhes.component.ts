import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { CasasService } from '../shared/services/casas/casas.service'
import { SwAlertService } from '../shared/services/swAlert/sw-alert.service'

@Component({
  selector: 'app-casas-detalhes',
  templateUrl: './casas-detalhes.component.html',
  styleUrls: ['./casas-detalhes.component.scss']
})
export class CasasDetalhesComponent implements OnInit {

  casa: any

  propriedadeForm = this.fb.group({
      foto: new FormControl('', [Validators.required]),
      lote: new FormControl('', [Validators.required]),
      quadra: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      observacoes: new FormControl('', [Validators.required]),
    })

  proprietarioForm = this.fb.group({
    celular: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    foto: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    whatsapp: new FormControl(false, [Validators.required]),
    observacoes: new FormControl('', [Validators.required]),
  })

  notificacoesForm = this.fb.group({
    data: new FormControl('', [Validators.required]),
    fotos: new FormControl(['']),
    observacoes: new FormControl('', [Validators.required]),
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private casasService: CasasService,
    private swAlertService: SwAlertService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if(params.id) {
        this.loadData(params.id)
      }
    })
  }

  selectFile(event: any) {
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    this.casa.tempFiles = this.casa.tempFiles ? [...this.casa.tempFiles, event.target.files[0]] : [event.target.files[0]]

    reader.onload = (event: any) => {
      this.casa.tempURL = this.casa.tempURL ? [...this.casa.tempURL, event.target.result] : [event.target.result]
    }
  }

  loadData(id: string) {
    this.swAlertService.swAlert("find")

    this.casasService.getByID(id).subscribe((result) => {

      this.casa = result
      this.propriedadeForm.patchValue(result.propriedade)
      this.proprietarioForm.patchValue(result.proprietario)
      // this.notificacoesForm.patchValue(result.notificacoes)
      this.notificacoesForm.reset()
      console.log(result)
    })
  }

  onSubmit() {
    const data = {
      id: this.casa?.id ? this.casa.id : '',
      proprietario: this.proprietarioForm.value,
      propriedade: this.propriedadeForm.value,
      notificacoes: this.casa?.notificacoes?.lenght > 0 ?  [... this.casa?.notificacoes, this.notificacoesForm.value] : [this.notificacoesForm.value]
    }

    console.table(data)

    if(this.casa?.id) {
      this.toastr.info('Salvando edição', 'Salvando..')
      this.swAlertService.swAlert("success")
      this.toastr.clear()

      this.casasService.update(data)
      .then((res) => {
        this.loadData(this.casa.id)
      },
      error => {
        this.swAlertService.swAlert("error")
      })

    } else {
      this.toastr.info('Realizando novo acadastro', 'Salvando..')
      this.swAlertService.swAlert("success")
      this.toastr.clear()

      this.casasService.add(data)
      .then((res) => {
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: { id: res.id },
            queryParamsHandling: 'merge',
          }
        )

        this.loadData(res.id)
      },
      error => {
        this.swAlertService.swAlert("error")
      })
    }

  }

  onRemove() {
    Swal.fire({
      icon: 'warning',
      title: 'Excluir?',
      text: 'Realmente quer excluir esse cadastro? Essa ação não pode ser revertida!',
      confirmButtonText: 'Execluir',
      confirmButtonColor: 'red',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      denyButtonColor: '#adb5bd',
    }).then(response => {
      if(response.isConfirmed) {
        Swal.fire({
          icon: 'info',
          title: 'Aguarde',
          showConfirmButton: false,
        })

        setTimeout(() => {
          const data = {
            id: this.casa?.id ? this.casa.id : '',
            proprietario: this.proprietarioForm.value,
            propriedade: this.propriedadeForm.value,
            notificacoes: this.notificacoesForm.value
          }

          this.casasService.delete(data).then(_ => {
            this.swAlertService.swAlert("success")
            this.router.navigate(['/dashboard/casas'])
          }, _ => {
            this.swAlertService.swAlert("error")
          })
        }, 2000);
      }
    })
  }
}
