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
      typeProbleme: ['', Validators.required ]
    });

    this.typesProblemes.obtenirTypesProbleme()
      .subscribe(cat => this.typesDeProblemes = cat,
          error => this.errorMessage = <any> error);
  }
}
