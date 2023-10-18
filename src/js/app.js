import TaskList from './TaskList';
import TaskStateService from './TaskStateService';
import TaskController from './TaskController';

const taskList = new TaskList();
taskList.bindToDOM(document.querySelector('.task-container'));

const stateService = new TaskStateService(localStorage);

const taskCtrl = new TaskController(taskList, stateService);
taskCtrl.init();
