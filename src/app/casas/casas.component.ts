import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
// import { SearchService } from '../shared/services/search/search.service'
import { CasasService } from '../shared/services/casas/casas.service'

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.scss']
})
export class CasasComponent implements OnInit {

  searchForm = this.fb.group({
    quadra: new FormControl('', [Validators.required]),
    lote: new FormControl('', [Validators.required])
  })

  casas: any

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    // private searchService: SearchService,
    private casasService: CasasService,
    ) { }

  ngOnInit(): void {
    this.loadAll()
  }

  onSearch() {
    if(this.searchForm.invalid) {
      this.toastr.warning('Não foi possivel pesquisar, campos invalidos', 'Ops..')
      return
    }

    // this.searchService.filterPersonalized(this.searchForm.value.quadra, this.searchForm.value.lote)
    // .subscribe((result) => {
    //   console.log(result)
    //   this.casas = result
    //   this.toastr.success(``, 'Pronto')
    // }, error => {
    //   console.log(error)
    //   this.toastr.error(`Tente novamente mais tarde`, 'Falha na busca')
    // })

  }

  loadAll() {
    this.toastr.info('Buscando dados', 'Carregando..')

    this.casasService.getAll().subscribe((res: any) => {
      this.casas = res
      this.toastr.success('', 'Sucesso')
    }, error => {
      this.toastr.warning('Algo deu errado, tenten novamente mais tarde', 'Ops..')
    })
  }

}
