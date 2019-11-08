import { FormControl, AbstractControl } from '@angular/forms';

export class PasswordValidator {

    static isValid(control: FormControl): any {

        if (!(/[a-z]/.test(control.value))) {
            return {
                "not lowercase found": true
            };
        }

        if (!(/[A-Z]/.test(control.value))) {
            return {
                "not uppercase found": true
            };
        }

        if (!(/\d/.test(control.value))) {
            return {
                "not number found": true
            };
        }

        return null;
    }

    static MatchPassword(AC: AbstractControl) {
        const newPassword = AC.get('pass').value; // to get value in input tag
        const confirmPassword = AC.get('passCheck').value; // to get value in input tag
        if (confirmPassword === '') {
            console.log('false');
            AC.get('passCheck').setErrors( { MatchPassword: true } );
        } else if (newPassword !== confirmPassword) {
            console.log('false');
            AC.get('passCheck').setErrors( { MatchPassword: true } );
        } else {
            console.log('true');
            AC.get('passCheck').setErrors(null);
        }
    }

    static checkConfirmPassword(control: FormControl): any {
        if (control.value === control.root.value['pass']) {
            console.log('passwords  match');
            return null;
        } else {
            return { "password not equal": true };
        }
    }

}
