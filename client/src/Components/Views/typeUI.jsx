import React from 'react';

import s from './typeUI.module.css'

const TypeUI = ({name, id, deleteTpe}) => {

    return (
        <div className={s.container}>
            <button type='button' id={s.btn__Close} value={id} onClick={ (e) => deleteTpe(e)}>X</button>
            {name}
        </div>
    )
}

export default TypeUI;
