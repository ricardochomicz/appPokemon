import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonDetailPage} from './pokemon-detail.page';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {UppercasePipeMock} from "../../pipes/uppercase.pipe.mock";


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
            imports: [HttpClientTestingModule],
            providers: [
                {provide: ActivatedRoute, useClass: ActivatedRouteMock}
            ],
            declarations: [UppercasePipeMock]
        });
        fixture = TestBed.createComponent(PokemonDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
