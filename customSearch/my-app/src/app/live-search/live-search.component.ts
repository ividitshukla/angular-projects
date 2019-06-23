import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LiveSearchService } from './search.service';

@Component({
    selector: 'app-live-search',
    templateUrl: './live-search.component.html',
    styleUrls: ['./live-search.component.scss']
})
export class LiveSearchComponent implements OnInit {
    results: any[] = [];
    data: any;
    searchText: string;
    public focusElement: number = 0;
    dataReceived: boolean = false;
    filteredLength: number = 0;
    keyPress: boolean = false;
    mouseEve: boolean = false;
    @ViewChild('listItem', { static: false }) lists: ElementRef;
    @ViewChild('keyword', { static: false }) searchTextBox: ElementRef;
    constructor(private liveSearchService: LiveSearchService) {
        this.liveSearchService.getData().subscribe(result => {
            this.results = result;
            this.dataReceived = true;
        });
    }
    ngOnInit() {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown($event: KeyboardEvent) {
        if ($event.keyCode === 40) {
            this.keyPress = true;
            if (this.focusElement >= this.lists.nativeElement.children.length) {
                this.focusElement = 0;
                this.searchTextBox.nativeElement.focus();
            } else {
                this.focusElement++;
                this.lists.nativeElement.children[this.focusElement - 1].focus();
            }
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyUp($event: KeyboardEvent) {
        if ($event.keyCode === 38) {
            this.keyPress = true;
            if (this.focusElement === 0) {
                this.focusElement = this.lists.nativeElement.children.length;
                this.lists.nativeElement.children[this.focusElement - 1].focus();
            } else if (this.focusElement === 1) {
                this.focusElement = 0;
                this.searchTextBox.nativeElement.focus();
            }
            else {
                this.focusElement--;
                this.lists.nativeElement.children[this.focusElement - 1].focus();
            }
        }
    }

    mouseHoverEvent(index) {
        if (!this.keyPress) {
            this.mouseEve = true;
            this.focusElement = index;
            this.lists.nativeElement.children[index - 1].focus();
        } else {
            this.keyPress = false;
        }
    }

    clearSearch() {
        this.searchText = '';
    }
}