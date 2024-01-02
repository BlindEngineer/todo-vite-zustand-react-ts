// это наш стор на цуштанде
import {create, State, StateCreator} from "zustand";
//девтулз
import {devtools} from "zustand/middleware";

import {generateId} from "../helpers.ts";

//описываем интерфейс тасок
interface Task {
  id: string;
  title: string;
  createdAt: number;
}

//описываем интерфейс стора
interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
  return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):
  StateCreator<T> => (set, get, api) =>
  config((nextState, ...args) => {
      if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
          nextState.tasks
        ))
      }
      set(nextState, ...args)
    },
    get,
    api,
  )

const getCurrentState = () => {
  try{
    const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
    return currentState
  } catch (err){
    window.localStorage.setItem('tasks', '[]')
  }
  return [];
}


//создаем сам стор
export const useToDoStore = create<ToDoStore>()(devtools(localStorageUpdate((set, get) => ({
  tasks: getCurrentState(),
  createTask: (title) => {
    //функция гет дает получить информацию обо ввсем нашем сторе
    const {tasks} = get();
    const newTask: Task = {
      id: generateId(),
      title,
      createdAt: Date.now(),
    }
    //функция set дает записать информацию в стор
    //не мутируем
    set({
      tasks: [newTask].concat(tasks)
    })
  },
  updateTask: (id, title) => {
    const {tasks} = get();
    set({
      tasks: tasks.map((task) => (
        {
          ...task,
          title: task.id === id ? title : task.title
        }
      ))
    })
  },
  removeTask: (id) => {
    const {tasks} = get();
    set({
      tasks: tasks.filter((task) => task.id !== id)
    })
  },
}))))