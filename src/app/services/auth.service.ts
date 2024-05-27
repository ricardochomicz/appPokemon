import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui'
import {environment} from "../../environments/environment";
import {getAuth} from "firebase/auth"
import {BehaviorSubject, Observable} from "rxjs";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private ui: firebaseui.auth.AuthUI | null;
    private userAuthenticatedSubject: BehaviorSubject<boolean>;

    constructor(private router: Router) {
        const app = firebase.initializeApp(environment.firebaseConfig);
        const auth = firebase.auth()


        // Verifique se uma instância AuthUI já existe
        if (firebaseui.auth.AuthUI.getInstance()) {
            this.ui = firebaseui.auth.AuthUI.getInstance();
        } else {
            this.ui = new firebaseui.auth.AuthUI(auth);
        }

        this.userAuthenticatedSubject = new BehaviorSubject<boolean>(false);

        firebase.auth().onAuthStateChanged(user => {
            this.userAuthenticatedSubject.next(!!user);
        });
    }

    startFirebaseUi(elementId: string) {
        const uiConfig = {
            signInOptions: [
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    recaptchaParameters: {
                        type: 'image', // 'audio'
                        size: 'normal', // 'invisible' or 'compact'
                        badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                    },
                    defaultCountry: 'BR',
                }
            ],
            callbacks: {
                signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
                    this.router.navigate(['/pokemon-favorites']); // Redireciona para a página de favoritos
                    return false; // Retorna false para evitar o redirecionamento padrão do FirebaseUI
                }
            }
        };
        const auth = getAuth()
        auth.useDeviceLanguage()
        auth.languageCode = 'pt-BR'
        firebase.auth().useDeviceLanguage()
        // @ts-ignore
        this.ui.start(elementId, uiConfig);
    }

    isUserAuthenticated(): Observable<boolean> {
        return this.userAuthenticatedSubject.asObservable();
    }

    logout() {
        firebase.auth().signOut().then(() => {
            this.router.navigate(['/pokemons']);
        }).catch((error) => {
            console.error('Error ao fazer o logout: ', error);
        });
    }


}
