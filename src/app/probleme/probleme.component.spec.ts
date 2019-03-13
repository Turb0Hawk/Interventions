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

  it('champ PRÉNOM doit contenir plus de 2 charactères', () =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    expect(prenom.valid).toBe(false);
  });

  it('champ PRÉNOM doit contenir plus de 2 charactères', () =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(3));
    expect(prenom.valid).toBe(true);
  });

  it('champ PRÉNOM doit contenir plus de 2 charactères', () =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(200));
    expect(prenom.valid).toBe(true);
  });

  it('champ PRÉNOM doit contenir plus de 2 charactères', () =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    expect(prenom.valid).toBeFalsy();
  });

  it('champ PRÉNOM doit contenir plus de 2 charactères', () =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    expect(prenom.valid).toBeFalsy();
  });

  it('champ PRÉNOM doit contenir plus de 2 charactères', () =>{
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    expect(prenom.valid).toBeFalsy();
  });
});
