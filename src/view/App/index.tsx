import React from "react";
import {useToDoStore} from "../../data/stores/useToDoStore.ts";

import {InputPlus} from "../components/InputPlus/InputPlus.tsx";

import styles from './index.module.scss'
import {InputTask} from "../components/InputTask/InputTask.tsx";

export const App: React.FC = () => {
  //типа ЮзСелектор
  const [tasks, createTask, updateTask, removeTask] = useToDoStore(state => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ])

  console.log(tasks)

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To DO App</h1>
      <section className={styles.articleSection}>
        <InputPlus onAdd={(title) => {
          if (title) {
            createTask(title)
          }
        }}/>
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && <p className={styles.articleText}>There is no tasks</p>}
        {tasks.map(task => (
          <InputTask
            key={task.id}
          id={task.id}
          title={task.title}
          onDone={removeTask}
          onEdited={updateTask}
          onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  )
}