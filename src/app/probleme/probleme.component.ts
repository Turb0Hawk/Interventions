import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {validateurLongueur} from '../shared/validateurLongueur/validateurLongueur';
import {TypeProblemeService} from './type-probleme.service';
import {ITypeProbleme} from './typeProbleme';
import {emailMatcherValidator} from '../shared/email-matcher/email-matcher';


@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;

  errorMessage: string;
  private typesDeProblemes: ITypeProbleme[];

  constructor(private formBuilder: FormBuilder, private typesProblemes: TypeProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.formBuilder.group({
      prenom : ['', [validateurLongueur.minimum(3), Validators.maxLength(200), Validators.required]],
      nom : ['', [Validators.maxLength(50), Validators.required]],
      typeProbleme: ['', Validators.required ],
      notification: ['Ne pas me notifier'],
      courrielsGroup: this.formBuilder.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
    });

    this.typesProblemes.obtenirTypesProbleme()
      .subscribe(cat => this.typesDeProblemes = cat,
          error => this.errorMessage = <any> error);
  }

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielsGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielsGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.controls['courrielsGroup'];
    const telephoneControl = this.problemeForm.controls['telephone'];

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    courrielGroupControl.clearValidators();
    courrielGroupControl.reset();
    courrielGroupControl.disable();

    if (typeNotification === 'ParCourriel') {
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+' )]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
      courrielGroupControl.setValidators(emailMatcherValidator.courrielDifferents());

    } else if (typeNotification === 'ParMessageTexte') {
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+' ), Validators.minLength(10),  Validators.maxLength(10)]);
      telephoneControl.enable();
    } else if (typeNotification === 'NePasMeNotifier') {
        courrielControl.setValidators([Validators.required]);
        courrielControl.disable();
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }
}
