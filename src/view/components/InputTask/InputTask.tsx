import React, {useEffect, useRef, useState} from "react";

import styles from './InputTask.module.scss'

//описываем пропсы
interface InputTaskProps {
  id: string;
  title: string
  onDone: (id: string) => void;
  onEdited: (id: string, value: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
                                                      id,
                                                      title,
                                                      onDone,
                                                      onEdited,
                                                      onRemoved,
                                                    }) => {

  const [checked, setChecked] = useState(false)
  const [isEditMode, setisEditMode] = useState(false)
  const [value, setValue] = useState(title)
  //реф для автофокуса
  const editTitleInputRef = useRef<HTMLInputElement>(null);
  useEffect(() =>{
if(isEditMode) {
  editTitleInputRef?.current?.focus()
}
  }, [isEditMode])
  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input type="checkbox" checked={checked} className={styles.inputTaskCheckbox}
               disabled={isEditMode}
               onChange={(evt) => {
                 setChecked(evt.target.checked)
                 if (evt.target.checked) {
                   setTimeout(() => {
                     onDone(id);
                   }, 500)
                 }
               }}
        />
        {isEditMode ? (
          <input
            type="text"
            value={value}
            ref={editTitleInputRef}
            onChange={(event) => {
              setValue(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onEdited(id, value);
                setisEditMode(false);
              }
            }}
            className={styles.inputTaskTitleEdit}/>
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )
        }

      </label>
      {isEditMode ? (
        <button aria-label="Save" className={styles.inputTaskSave} onClick={() => {
          onEdited(id, value);
          setisEditMode(false);
        }}/>
      ) : (
        <button aria-label="Edit" className={styles.inputTaskEdit} onClick={() => {
          setisEditMode(true)
        }}/>
      )}
      <button aria-label="Remove" className={styles.inputTaskRemove} onClick={() => {
        if (confirm('Are you sure?')) {
          onRemoved(id)
        }
      }}/>
    </div>
  )
}