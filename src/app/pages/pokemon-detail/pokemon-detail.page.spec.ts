import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonDetailPage} from './pokemon-detail.page';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {UppercasePipeMock} from "../../pipes/uppercase.pipe.mock";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";



class ActivatedRouteMock {
    private subject = new BehaviorSubject(convertToParamMap({}));

    setParams(params: any) {
        this.subject.next(convertToParamMap(params));
    }

    get snapshot() {
        return {paramMap: this.subject.value};
    }
}

describe('PokemonDetailPage', () => {
    let component: PokemonDetailPage;
    let fixture: ComponentFixture<PokemonDetailPage>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialize o AngularFire com sua configuração
                AngularFireAuthModule],
            providers: [
                {provide: ActivatedRoute, useClass: ActivatedRouteMock}
            ],
            declarations: []
        });
        fixture = TestBed.createComponent(PokemonDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

describe('Pipe: uppercase', () => {
    it('create an instance', () => {
        let pipe = new UppercasePipeMock();
        expect(pipe).toBeTruthy();
    });
});
