import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlesLienzoComponent } from './controles-lienzo.component';

describe('ControlesLienzoComponent', () => {
  let component: ControlesLienzoComponent;
  let fixture: ComponentFixture<ControlesLienzoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlesLienzoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlesLienzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
