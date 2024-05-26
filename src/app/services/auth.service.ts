import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui'
import {environment} from "../../environments/environment";



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private ui: firebaseui.auth.AuthUI | null;

    constructor() {
        const app = firebase.initializeApp(environment.firebaseConfig);
        const auth = firebase.auth()


        // Verifique se uma instância AuthUI já existe
        if (firebaseui.auth.AuthUI.getInstance()) {
            this.ui = firebaseui.auth.AuthUI.getInstance();
        } else {
            this.ui = new firebaseui.auth.AuthUI(auth);
        }
    }

    startFirebaseUi(elementId: string) {
        const uiConfig = {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: () => false
            }
        };

        // @ts-ignore
        this.ui.start(elementId, uiConfig);
    }



}
