import React from 'react'
import s from './byDefault.module.css'
import IMG from './error.png'

const ByDefault = () => {
    return (
        <div className={s.container}>
            <h2 id={s.title}>La Informacion solicitada no se ah encontrado <br />
                en nuestra base de datos :( 
            </h2>
            <div className={s.image}>
                <img src={IMG} alt="Error" />
            </div>
            
        </div>
    )
}

export default ByDefault
