export default class TaskList {
  constructor() {

    // this.boardSize = 4;
    // this.container = null;
    // this.boardEl = null;
    // this.activeCell = null;
    // this.catch = 0;
    // this.miss = 0;
    // this.tries = 0;
    // this.shots = 0;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUi() {
    this.checkBinding();

    // this.boardEl = this.container.querySelector('[data-id=board]');

    // for (let i = 0; i < this.boardSize * this.boardSize; i += 1) {
    //   const cellEl = document.createElement('div');
    //   cellEl.classList.add('cell');
    //   this.boardEl.appendChild(cellEl);
    // }
  }

  // redrawPositions(newCell) {
  //   if (this.activeCell !== null) {
  //     this.boardEl.children[this.activeCell].innerHTML = '';
  //   }
  //   const cellEl = this.boardEl.children[newCell];
  //   const charEl = document.createElement('div');
  //   charEl.classList.add('goblin');

  //   cellEl.appendChild(charEl);
  // }

  checkBinding() {
    if (this.container === null) {
      throw new Error('TaskList not bind to DOM');
    }
  }
}
