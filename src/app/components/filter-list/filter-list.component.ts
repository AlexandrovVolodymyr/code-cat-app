import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Button } from '../../enums/button.enum';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatDivider } from '@angular/material/divider';
import { FilterService } from '../../services/filter.service';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FILTER_LIST } from './filter-list.constant';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-filter-list',
  standalone: true,
  imports: [
    ButtonComponent,
    CdkListbox,
    CdkOption,
    SvgIconComponent,
    MatDivider,
    AsyncPipe,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
  ],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterListComponent {
  @ViewChild(CdkListbox) listBox!: CdkListbox;
  @Output() addFilterEvent = new EventEmitter<string>();
  protected readonly Button = Button;
  categories = FILTER_LIST;
  activeCategory: string | undefined;

  private filterService = inject(FilterService);
  isOpen$: Observable<boolean> = this.filterService.isOpenFilter$.pipe(
    tap(() => {
      if (this.activeCategory) {
        this.reset();
      }
    })
  );

  toggleFilter(): void {
    this.filterService.setFilterState(!this.filterService.getFilterState());
  }

  reset(): void {
    this.listBox.toggleValue(this.activeCategory);
    this.activeCategory = '';
  }

  selectCategory(category: string): void {
    this.activeCategory = category;
  }

  addFilter(): void {
    this.addFilterEvent.emit(this.activeCategory);
  }
}
