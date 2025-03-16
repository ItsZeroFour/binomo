import React from 'react'
import style from './style.module.scss'

const Upload = () => {
  return (
    <section className={style.upload}>
      <div className="container">
        <div className={`wrapper ${style.upload__wrapper}`}></div>
      </div>
    </section>
  )
}

export default Upload