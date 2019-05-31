import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagePkmnComponent } from './affichage-pkmn.component';

describe('AffichagePkmnComponent', () => {
  let component: AffichagePkmnComponent;
  let fixture: ComponentFixture<AffichagePkmnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichagePkmnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichagePkmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
