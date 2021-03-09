import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesLienzo2Component } from './controles-lienzo2.component';

describe('ControlesLienzo2Component', () => {
  let component: ControlesLienzo2Component;
  let fixture: ComponentFixture<ControlesLienzo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlesLienzo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesLienzo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
