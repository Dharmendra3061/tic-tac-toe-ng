import { Component, OnInit } from '@angular/core';
import { Board } from '../models/board';
import { BoardCell } from '../models/boardCell';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  constructor() { }

  xValue: string = 'x';
  yValue: string = '0';
  emptyCell: BoardCell = { hasValue: false, value: false, displayValue: '' };
  emptyCells: BoardCell[][] = [
    [{ hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }],
    [{ hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }],
    [{ hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }]
  ];

  myBoard: Board = {
    cells: this.emptyCells
  };

  turns: string = this.xValue;
  winner: string = '';

  ngOnInit(): void {
  }

  selectedCell($event: any, i: number, j: number) {
    if (this.winner) {
      this.reset();
    }
    if (!this.myBoard.cells[i][j].hasValue) {
      this.myBoard.cells[i][j].hasValue = true;
      this.myBoard.cells[i][j].displayValue = this.turns;
      this.myBoard.cells[i][j].value = this.turns === this.xValue;
      this.turns = this.turns === this.xValue ? this.yValue : this.xValue;
      this.winner = this.checkWinner();
    }
  }

  checkWinner(): string {

    // row-wise check :
    for (let i = 0; i < 3; i++) {
      //row wise check :
      if(this.myBoard.cells[i][0].displayValue === this.xValue
        && this.myBoard.cells[i][1].displayValue === this.xValue
        && this.myBoard.cells[i][2].displayValue === this.xValue)
        return this.xValue;

      if(this.myBoard.cells[i][0].displayValue === this.yValue
        && this.myBoard.cells[i][1].displayValue === this.yValue
        && this.myBoard.cells[i][2].displayValue === this.yValue)
        return this.yValue;

      //column wise check :
      if(this.myBoard.cells[0][i].displayValue === this.xValue
        && this.myBoard.cells[1][i].displayValue === this.xValue
        && this.myBoard.cells[2][i].displayValue === this.xValue)
        return this.xValue;

      if(this.myBoard.cells[0][i].displayValue === this.yValue
        && this.myBoard.cells[1][i].displayValue === this.yValue
        && this.myBoard.cells[2][i].displayValue === this.yValue)
        return this.yValue;
    }

    //diagonal wise check :
    if(this.myBoard.cells[0][0].displayValue === this.xValue
      && this.myBoard.cells[1][1].displayValue === this.xValue
      && this.myBoard.cells[2][2].displayValue === this.xValue)
      return this.xValue;
    
    if(this.myBoard.cells[2][0].displayValue === this.xValue
      && this.myBoard.cells[1][1].displayValue === this.xValue
      && this.myBoard.cells[0][2].displayValue === this.xValue)
      return this.xValue;

    if(this.myBoard.cells[0][0].displayValue === this.yValue
      && this.myBoard.cells[1][1].displayValue === this.yValue
      && this.myBoard.cells[2][2].displayValue === this.yValue)
      return this.yValue;
    if(this.myBoard.cells[2][0].displayValue === this.yValue
      && this.myBoard.cells[1][1].displayValue === this.yValue
      && this.myBoard.cells[0][2].displayValue === this.yValue)
      return this.yValue;
    
    //check if match draw :
    let hasAnyValueEmpty = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.myBoard.cells[i][j].hasValue) {
          hasAnyValueEmpty = true;
        }
      }
    }
    if (!hasAnyValueEmpty) {
      return this.winner = "Draw";
    }
    return '';
  }

  reset() {
    this.winner = '';
    this.turns = this.xValue;
    this.emptyCells = [
      [{ hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }],
      [{ hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }],
      [{ hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }, { hasValue: false, value: false, displayValue: '' }]
    ];
    this.myBoard = {
      cells: this.emptyCells
    };
  }
}
