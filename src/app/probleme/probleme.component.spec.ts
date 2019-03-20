import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('champ  PRÉNOM valide avec 3 caractères', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(3));
    expect(prenom.valid).toBe(true);
  });

  it('Champ PRÉNOM invalide avec 2 caractères ', () => {
    let errors = {};
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    errors = prenom.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Champ PRÉNOM valide avec 200 caractères', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(200));
    expect(prenom.valid).toBe(true);
  });

  it('Champ  PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let prenom = component.problemeForm.controls['prenom'];
    errors = prenom.errors || {};
    expect(errors['required']).toBe(true);
  });

  it('Champ PRÉNOM valide avec 10 espaces', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue(' '.repeat(10));
    expect(prenom.valid).toBe(true);
  });

  it('Champ  PRÉNOM valide avec 2 espaces et 1 caractère ', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('  a');
    expect(prenom.valid).toBe(true);
  })
});
