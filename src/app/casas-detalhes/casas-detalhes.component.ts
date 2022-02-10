import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { ToastrService } from 'ngx-toastr';
import { CasasService } from '../shared/services/casas/casas.service'

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
    private activatedRoute: ActivatedRoute,
    private casasService: CasasService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if(params.id) {
        this.loadData(params.id)
      }
    })
  }

  loadData(id: string) {
    this.toastr.info('Buscando dados', 'Carregando..')

    this.casasService.getByID(id).subscribe((result) => {
      this.toastr.success('', 'Sucesso')

      this.casa = result

      this.propriedadeForm.patchValue(result.propriedade)

      this.proprietarioForm.patchValue(result.proprietario)

      this.notificacoesForm.patchValue(result.notificacoes)
    })
  }

  onSubmit() {
    const data = {
      id: this.casa?.id ? this.casa.id : '',
      proprietario: this.proprietarioForm.value,
      propriedade: this.propriedadeForm.value,
      notificacoes: this.notificacoesForm.value
    }

    console.table(data)

    if(this.casa?.id) {
      this.toastr.info('Salvando edição', 'Salvando..')

      this.casasService.update(data)
      .then((res) => {
        this.loadData(this.casa.id)
      },
      error => {
        this.toastr.error('Algo deu errado, tente novamente mais tarde', 'Opss')
      })

    } else {
      this.toastr.info('Realizando novo acadastro', 'Salvando..')

      this.casasService.add(data)
      .then((res) => {
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: { id: res.id },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          }
        )

        this.loadData(res.id)

      },
      error => {
        this.toastr.error('Algo deu errado, tente novamente mais tarde', 'Opss')
      })
    }

  }
}
