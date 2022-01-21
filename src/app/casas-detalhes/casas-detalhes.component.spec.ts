import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasasDetalhesComponent } from './casas-detalhes.component';

describe('CasasDetalhesComponent', () => {
  let component: CasasDetalhesComponent;
  let fixture: ComponentFixture<CasasDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasasDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasasDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
