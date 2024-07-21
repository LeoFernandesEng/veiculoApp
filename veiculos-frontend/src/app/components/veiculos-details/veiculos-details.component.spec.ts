import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosDetailsComponent } from './veiculos-details.component';

describe('VeiculosDetailsComponent', () => {
  let component: VeiculosDetailsComponent;
  let fixture: ComponentFixture<VeiculosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeiculosDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
