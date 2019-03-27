import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LongueurMinimum} from '../shared/longueur-minimum/longueur-minimum.component';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.problemeForm = this.formBuilder.group({
      prenom : ['', [LongueurMinimum.valide(3), Validators.maxLength(200), Validators.required]]
    });
  }

}
