import React from 'react'
import { Link } from 'react-router-dom'
import IMG from './error.png'

import s from './byDefault.module.css'

const ByDefault = () => {

    return (
        <div className={s.container}>
            <h2 id={s.title}>The requested information was not found in our database :(</h2>
            <ul>
                <li><Link to='/home/create'>Create pokemon</Link></li>
                <li><Link to='/'>Landing page</Link></li>
            </ul>
            <div className={s.image}>
                <img src={IMG} alt="Error" />
            </div>
            
        </div>
    )
}

export default ByDefault