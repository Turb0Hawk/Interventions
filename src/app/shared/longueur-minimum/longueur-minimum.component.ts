import { ValidatorFn, AbstractControl } from '@angular/forms';

export class LongueurMinimum {
  static valide(valeurMinimum: number ): ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null => {
      if (c.value != null) {
        if (c.value.trim().length >= valeurMinimum) {
          return null;
        }
      }
      return {'nbreCaracteresInsuffisants': true};
    };
  }
}
