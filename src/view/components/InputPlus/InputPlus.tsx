import React, {useCallback, useState} from "react";

import styles from './InputPlus.module.scss'

//описываем пропсы
interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({onAdd}) => {
  const [inputValue, setInputValue] = useState('')
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value)
  }
  const addTask = useCallback(() => {
onAdd(inputValue);
setInputValue('');
  }, [inputValue])

  return(
    <div className={styles.inputPlus}>
      <input type="text" className={styles.inputPlusValue} value={inputValue}
             onChange={(event) => handleChange(event)}
      onKeyDown={(evt) => {
        if (evt.key === 'Enter') {
          addTask();
        }
      }}
      placeholder="something to do"/>
      <button onClick={addTask}
      aria-label="Add" className={styles.inputPlusButton}/>
    </div>
  )
}