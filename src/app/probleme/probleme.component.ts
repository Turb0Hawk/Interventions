import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {validateurLongueur} from '../shared/validateurLongueur/validateurLongueur';
import {TypeProblemeService} from './type-probleme.service';
import {ITypeProbleme} from './typeProbleme';
import {emailMatcherValidator} from '../shared/email-matcher/email-matcher';
import {IProbleme} from './probleme';
import {ProblemeService} from './probleme.service';


@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;

  errorMessage: string;
  private typesDeProblemes: ITypeProbleme[];

  probleme: IProbleme;
  messageSauvegarde: string;


  constructor(private formBuilder: FormBuilder, private typesProblemes: TypeProblemeService, private problemeService: ProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.formBuilder.group({
      prenom : ['', [validateurLongueur.minimum(3), Validators.maxLength(200), Validators.required]],
      nom : ['', [Validators.maxLength(50), Validators.required]],
      typeProbleme: ['', Validators.required ],
      notification: ['NePasMeNotifier'],
      courrielsGroup: this.formBuilder.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true}
    });

    this.typesProblemes.obtenirTypesProbleme()
      .subscribe(cat => this.typesDeProblemes = cat,
          error => this.errorMessage = <any> error);

    this.problemeForm.get('notification').valueChanges
      .subscribe(value => this.appliquerNotifications(value));
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

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

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
        telephoneControl.disable();
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
      this.probleme = this.problemeForm.value;
      // Affecter les valeurs qui proviennent du fg le plus interne.
      this.probleme.courriel =  this.problemeForm.get('courrielsGroup.courriel').value;
      this.probleme.courrielConfirmation =  this.problemeForm.get('courrielsGroup.courrielConfirmation').value;
      this.probleme.dateProbleme = new Date();
      this.problemeService.saveProbleme(this.probleme)
        .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
          () => this.onSaveComplete(),  // Fonction callback
          (error: any) => this.errorMessage = <any> error
        );
    }
  }

  onSaveComplete(): void {
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre problème a bien été sauvegardée.  Nous vous remercions.';
  }
}
