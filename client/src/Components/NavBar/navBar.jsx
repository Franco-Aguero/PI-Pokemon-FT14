import React from 'react'
import { Link } from 'react-router-dom'
import IMG from './create.png'
import Img from './logo.png'

import s from './navBar.module.css'

const NavBar = () => {

    return (
        <div className={s.body}>
            
            <Link to="/home"><button id={s.btnLogo}><img src={Img} alt="Logo Pokemon" className={s.imgLogo}/></button></Link>
            <Link to="/home/create"><button id={s.btnCreate}><img src={IMG} alt="Create Pokemon" /></button></Link>
            
        </div>
    )
}

export default NavBar