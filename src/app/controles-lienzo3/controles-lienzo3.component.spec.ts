import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesLienzo3Component } from './controles-lienzo3.component';

describe('ControlesLienzo3Component', () => {
  let component: ControlesLienzo3Component;
  let fixture: ComponentFixture<ControlesLienzo3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlesLienzo3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesLienzo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
