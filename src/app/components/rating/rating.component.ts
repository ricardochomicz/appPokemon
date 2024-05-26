import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    standalone: true
})
export class RatingComponent  {

    @Input() rating: number = 0 ;

    @Output() ratingChange: EventEmitter<number> = new EventEmitter();

    constructor() {}

    rate(index: number) {
        this.rating = index;
        this.ratingChange.emit(this.rating)
    }

    getColor(index: number) {

    }

    isAboveRating(index: number): any {
        return index > this.rating;
    }

}
