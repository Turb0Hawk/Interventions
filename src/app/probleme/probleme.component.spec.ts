import { validateurLongueur } from '../shared/validateurLongueur/validateurLongueur';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import {TypeProblemeService} from './type-probleme.service';
import {HttpClientModule} from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularFontAwesomeModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [TypeProblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('champ  PRÉNOM minimum avec 3 caractères', () => {
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(3));
    expect(prenom.valid).toBe(true);
  });

  it('Champ PRÉNOM invalide avec 2 caractères ', () => {
    let errors = {};
    let prenom = component.problemeForm.controls['prenom'];
    prenom.setValue('a'.repeat(2));
    errors = prenom.errors || {};
    expect(errors['nbreCaracteresInsuffisants']).toBeTruthy();
  });

  it('Champ PRÉNOM minimum avec 200 caractères', () => {
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

  it('Champ PRÉNOM invalide avec 10 espaces', () => {
    let prenom = component.problemeForm.controls['prenom'];
    let validator = validateurLongueur.minimum(3);
    let result = validator(prenom as AbstractControl);
    prenom.setValue(' '.repeat(10));
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('Champ  PRÉNOM invalide avec 2 espaces et 1 caractère ', () => {
    let prenom = component.problemeForm.controls['prenom'];
    let validator = validateurLongueur.minimum(3);
    let result = validator(prenom as AbstractControl);
    prenom.setValue('  a');
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.controls['telephone'];
    expect( zone.status ).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.controls['telephone'];
    expect( zone.value ).toEqual('');
  });

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.get('courrielsGroup.courriel');
    expect( zone.status ).toEqual('DISABLED');
  });

  it(' Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasMeNotifier');
    let zone = component.problemeForm.get('courrielsGroup.courrielConfirmation');
    expect( zone.status ).toEqual('DISABLED');
  });
});
