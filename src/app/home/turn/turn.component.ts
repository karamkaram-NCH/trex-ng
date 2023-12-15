import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowComponent } from '../row/row.component';
import { TurnInterface } from 'src/app/interfaces/trex-types';
import { TurnService } from './turn.service';

@Component({
  selector: 'app-turn',
  standalone: true,
  imports: [CommonModule, RowComponent],
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss'],
  providers: [TurnService],
})
export class TurnComponent {
  @Input() bgColor = 'antiquewhite';
  @Input() turn!: TurnInterface;
  @Input() public turnNb!: 1 | 2 | 3 | 4;
  @Input() public playerName = '';
}
