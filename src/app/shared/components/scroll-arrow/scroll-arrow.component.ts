import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scroll-arrow',
  templateUrl: './scroll-arrow.component.html',
  styleUrls: ['./scroll-arrow.component.scss'],
})
export class ScrollArrowComponent {
  isHidden = true;
  // eventListener;

  @ViewChild('scrollArrow') button?: ElementRef;

  constructor() {
    /*this.eventListener = */ document.addEventListener('scroll', (e) => {
      if (window.scrollY > 200) this.isHidden = false;
      if (window.scrollY < 100) this.isHidden = true;

      this.button?.nativeElement.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
    });
  }

  toggle() {
    this.isHidden = !this.isHidden;
  }

  // ngOnDestroy(): void {
  //   document.removeEventListener(this.eventListener);
  // }
}
