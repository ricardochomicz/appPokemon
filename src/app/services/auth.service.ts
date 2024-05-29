import {Injectable} from '@angular/core';
import firebase from "firebase/compat/app";
import * as firebaseui from 'firebaseui'
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from '@angular/router';
import 'firebase/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {HttpClient} from "@angular/common/http";
import {getAuth} from "firebase/auth";
import User = firebase.User;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUser: firebase.User | null = null;
    private ui: firebaseui.auth.AuthUI | null;
    private userAuthenticatedSubject: BehaviorSubject<boolean>;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private httpClient: HttpClient) {
        const app = firebase.initializeApp(environment.firebaseConfig);
        const auth = firebase.auth()


        // Verifique se uma instância AuthUI já existe
        if (firebaseui.auth.AuthUI.getInstance()) {
            this.ui = firebaseui.auth.AuthUI.getInstance();
        } else {
            this.ui = new firebaseui.auth.AuthUI(auth);
        }

        firebase.auth().onAuthStateChanged(user => {
            this.currentUser = user;
        });

        this.userAuthenticatedSubject = new BehaviorSubject<boolean>(false);

        firebase.auth().onAuthStateChanged(user => {
            this.userAuthenticatedSubject.next(!!user);
        });
    }


    startFirebaseUi(elementId: string) {
        // Configuração da interface de usuário do Firebase Authentication (UI)
        const uiConfig = {
            signInOptions: [
                {
                    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                    defaultCountry: 'BR',
                },
            ],
            callbacks: {
                signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {
                    console.log(authResult)
                    this.saveUserUidToSession()
                    this.router.navigate(['/pokemons']);

                    return false; // Retorna false para evitar o redirecionamento padrão do FirebaseUI
                }
            }
        };

        // Usa o idioma do dispositivo para a autenticação
        firebase.auth().useDeviceLanguage();

        // Inicia a interface de usuário do Firebase Authentication com a configuração fornecida
        // @ts-ignore
        this.ui.start(elementId, uiConfig);
    }

    async saveUserUidToSession() {
        const user = await this.afAuth.currentUser;
        if (user) {
            localStorage.setItem('userUid', user.uid);
        }
    }

    getUserUidSession(){
        return localStorage.getItem('userUid')
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
