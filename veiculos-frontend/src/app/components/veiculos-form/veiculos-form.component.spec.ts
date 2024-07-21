import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosFormComponent } from './veiculos-form.component';

describe('VeiculosFormComponent', () => {
  let component: VeiculosFormComponent;
  let fixture: ComponentFixture<VeiculosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeiculosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
