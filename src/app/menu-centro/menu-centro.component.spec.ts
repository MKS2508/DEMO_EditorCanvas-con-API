import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCentroComponent } from './menu-centro.component';

describe('MenuCentroComponent', () => {
  let component: MenuCentroComponent;
  let fixture: ComponentFixture<MenuCentroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCentroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
