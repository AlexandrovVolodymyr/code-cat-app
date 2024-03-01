import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatButton } from '@angular/material/button';
import { Button } from '../../enums/button.enum';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable } from 'rxjs';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [SvgIconComponent, MatButton, NgClass, AsyncPipe],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() clickEvent = new EventEmitter<void>();
  @Input() hasIcon = true;
  @Input() text = '';
  @Input() type = Button.Primary;

  private filterService = inject(FilterService);
  isOpen$: Observable<boolean> = this.filterService.isOpenFilter$;

  protected readonly Button = Button;

  onClick(): void {
    this.clickEvent.emit();
  }
}
