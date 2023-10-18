import TaskState from './TaskState';

export default class TaskController {
  constructor(taskList, stateService) {
    this.taskList = taskList;
    this.stateService = stateService;

    this.todoContainer = document.querySelector('.todo-tasks');
    this.todoNewButton = document.querySelector('#todo-new-task');
    this.todoAddForm = document.querySelector('#todo-add-task');

    this.inprogressContainer = document.querySelector('.inprogress-tasks');
    this.inprogressNewButton = document.querySelector('#inprogress-new-task');
    this.inprogressAddForm = document.querySelector('#inprogress-add-task');

    this.doneContainer = document.querySelector('.done-tasks');
    this.doneNewButton = document.querySelector('#done-new-task');
    this.doneAddForm = document.querySelector('#done-add-task');
    // this.onNewTaskClick = this.onNewTaskClick.bind(this);

    this.activeContainer = undefined;
    this.activeNewButton = undefined;
    this.activeAddForm = undefined;
    this.activeTaskArray = undefined;
    this.actualElement = undefined;
    this.actualX = undefined;
    this.actualY = undefined;

    this.taskState = new TaskState();

    // this.onAddTaskClick = this.onAddTaskClick.bind(this);

    // this.points = document.querySelector('.points');
    // this.misses = document.querySelector('.misses');
  }

  init() {
    this.taskList.drawUi();

    this.todoNewButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.activeContainer) {
        this.onAddTaskCancel();
      }
      this.activeContainer = this.todoContainer;
      this.activeNewButton = this.todoNewButton;
      this.activeAddForm = this.todoAddForm;
      this.activeTaskArray = this.taskState.todoTaskArray;
      this.onNewTaskClick();
    });

    this.todoAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onAddTaskClick();
      this.cleanActiveElements();
    });

    this.todoAddForm.addEventListener('reset', (e) => {
      e.preventDefault();
      this.onAddTaskCancel();
      this.cleanActiveElements();
    });

    this.inprogressNewButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.activeContainer) {
        this.onAddTaskCancel();
      }
      this.activeContainer = this.inprogressContainer;
      this.activeNewButton = this.inprogressNewButton;
      this.activeAddForm = this.inprogressAddForm;
      this.activeTaskArray = this.taskState.inprogressTaskArray;
      this.onNewTaskClick();
    });

    this.inprogressAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onAddTaskClick();
      this.cleanActiveElements();
    });

    this.inprogressAddForm.addEventListener('reset', (e) => {
      e.preventDefault();
      this.onAddTaskCancel();
      this.cleanActiveElements();
    });

    this.doneNewButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.activeContainer) {
        this.onAddTaskCancel();
      }
      this.activeContainer = this.doneContainer;
      this.activeNewButton = this.doneNewButton;
      this.activeAddForm = this.doneAddForm;
      this.activeTaskArray = this.taskState.doneTaskArray;
      this.onNewTaskClick();
    });

    this.doneAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onAddTaskClick();
      this.cleanActiveElements();
    });

    this.doneAddForm.addEventListener('reset', (e) => {
      e.preventDefault();
      this.onAddTaskCancel();
      this.cleanActiveElements();
    });

    this.redrawTaskList();

  }

  redrawTaskList() {

    const oldTasks = Array.from(document.querySelectorAll('.task'));

    for (let i = 0; i < oldTasks.length; i++) {
      oldTasks[i].remove();
    }

    const loadTaskList = this.stateService.load();
    if (!loadTaskList) {
      return;
    }

    this.taskState.todoTaskArray = loadTaskList.todoTaskArray;
    // this.taskState.todoTaskArray = [];
    // this.stateService.save(this.taskState);
    this.taskState.inprogressTaskArray = loadTaskList.inprogressTaskArray;
    this.taskState.doneTaskArray = loadTaskList.doneTaskArray;

    this.redrawColumn(1);
    this.redrawColumn(2);
    this.redrawColumn(3);

  }

  onNewTaskClick() {
    this.activeAddForm.classList.remove('visually-hidden');
    this.activeNewButton.classList.add('visually-hidden');
  }

  onAddTaskClick() {
    const newTaskText = this.activeAddForm.querySelector('.add-task-input');

    this.activeTaskArray.push(newTaskText.value);
    newTaskText.value = "";

    this.activeAddForm.classList.add('visually-hidden');
    this.activeNewButton.classList.remove('visually-hidden');
    this.stateService.save(this.taskState);
    this.redrawTaskList();

  }

  onAddTaskCancel() {
    this.activeAddForm.querySelector('.add-task-input').value = "";

    this.activeAddForm.classList.add('visually-hidden');
    this.activeNewButton.classList.remove('visually-hidden');

  }

  cleanActiveElements() {
    this.activeContainer = undefined;
    this.activeNewButton = undefined;
    this.activeAddForm = undefined;
    this.activeTaskArray = undefined;
  }

  redrawColumn(col) {
    let redrawingTaskArray;
    let redrawingContainer;
    if (col === 1) {
        redrawingTaskArray = this.taskState.todoTaskArray;
        redrawingContainer = this.todoContainer;
    } else if (col === 2) {
        redrawingTaskArray = this.taskState.inprogressTaskArray;
        redrawingContainer = this.inprogressContainer;
     } else {
        redrawingTaskArray = this.taskState.doneTaskArray;
        redrawingContainer = this.doneContainer;
    }
    for (let i = 0; i < redrawingTaskArray.length; i++) {
      
      const taskText = document.createElement('div');
      taskText.classList.add('task');
      const taskDelete = document.createElement('button');
      taskDelete.classList.add('del-task-btn', 'visually-hidden');
      taskText.textContent = redrawingTaskArray[i];
      redrawingContainer.appendChild(taskText);
      taskText.appendChild(taskDelete);
      
      taskText.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        if (!this.actualElement) {
          e.target.children[0].classList.remove('visually-hidden');
        }
        // e.target.style.cursor = 'pointer';
      });
      
      taskText.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        if (!this.actualElement) {
          e.target.children[0].classList.add('visually-hidden');
        }
      });
      
      taskDelete.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.activeContainer) {
          this.onAddTaskCancel();
        }
        switch (col) {
          case 1:
            this.taskState.todoTaskArray = this.taskState.todoTaskArray.filter(item => item != taskText.textContent);
          case 2:
            this.taskState.inprogressTaskArray = this.taskState.inprogressTaskArray.filter(item => item != taskText.textContent);
          case 3:
            this.taskState.doneTaskArray = this.taskState.doneTaskArray.filter(item => item != taskText.textContent);
        }
        this.stateService.save(this.taskState);
        this.redrawTaskList();
      });

      const onMouseUp = (el) => {
        document.documentElement.removeEventListener('mousemove', onMouseMove);
        document.documentElement.removeEventListener('mouseup', onMouseUp);
        const mouseUpItem = el.target;
    
        this.actualElement.classList.remove('dragged');
        // this.todoContainer.insertBefore(this.actualElement, mouseUpItem);

        if (el.target.classList.contains('task')) {
          if (this.taskState.todoTaskArray.indexOf(this.actualElement.textContent) > -1) {
            this.taskState.todoTaskArray = this.taskState.todoTaskArray.filter(item => item != this.actualElement.textContent);
          } else if (this.taskState.inprogressTaskArray.indexOf(this.actualElement.textContent) > -1) {
            this.taskState.inprogressTaskArray = this.taskState.inprogressTaskArray.filter(item => item != this.actualElement.textContent);
          } else if (this.taskState.doneTaskArray.indexOf(this.actualElement.textContent) > -1) {
            this.taskState.doneTaskArray = this.taskState.doneTaskArray.filter(item => item != this.actualElement.textContent);
          }

          let elBefore = this.taskState.todoTaskArray.indexOf(el.target.textContent);
          if (elBefore > -1) {
            this.taskState.todoTaskArray.splice(elBefore, 0, this.actualElement.textContent);
          } else {
            elBefore = this.taskState.inprogressTaskArray.indexOf(el.target.textContent);
            if (elBefore > -1) {
              this.taskState.inprogressTaskArray.splice(elBefore,0,this.actualElement.textContent);
            } else {
                elBefore = this.taskState.doneTaskArray.indexOf(el.target.textContent);
                if (elBefore > -1) {
                  this.taskState.doneTaskArray.splice(elBefore,0,this.actualElement.textContent);
                }            
            }
          }
        }

        this.actualElement = undefined;
        this.actualX = undefined;
        this.actualY = undefined;
        this.stateService.save(this.taskState);
        this.redrawTaskList();
    }

      const onMouseMove = (el) => {
        this.actualElement.style.left = el.clientX - this.actualX + 'px';
        this.actualElement.style.top = el.clientY - this.actualY + 'px';

        // document.body.appendChild(this.actualElement);
      }

      taskText.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.target.textContent !== '') {
          this.actualElement = e.target;
          this.actualX = e.clientX - e.target.getBoundingClientRect().left;
          this.actualY = e.clientY - e.target.getBoundingClientRect().top;
          this.actualElement.classList.add('dragged');
          e.target.style.cursor = 'grabbing';
          document.documentElement.addEventListener('mouseup', onMouseUp);
          document.documentElement.addEventListener('mousemove', onMouseMove);
        }
      });
      
    }
  }

}
