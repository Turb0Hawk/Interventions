import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {validateurLongueur} from '../shared/validateurLongueur/validateurLongueur';
import {TypeProblemeService} from './type-probleme.service';
import {ITypeProbleme} from './typeProbleme';


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
    const telephoneControl = this.problemeForm.controls['telephone'];

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    if (typeNotification === 'ParCourriel') {
      courrielControl.setValidators([Validators.required]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
      // Si le validateur est dans un autre fichier l'écire sous la forme suivante :
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
      // courrielsGroupControl.setValidators([Validators.compose([datesValides])]);
    } else if (typeNotification === 'ParMessageTexte') {
      telephoneControl.setValidators([Validators.required]);
      telephoneControl.enable();
    } else if (typeNotification === 'NePasMeNotifier') {
        courrielControl.setValidators([Validators.required]);
        courrielControl.disable();
    }
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
  }
}
