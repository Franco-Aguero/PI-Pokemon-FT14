import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search/search'
import Img from './logo.png'

import s from './navBar.module.css'

const NavBar = () => {

    return (
        <div className={s.body}>
            
            <Link to="/home"><button id={s.btnLogo}><img src={Img} alt="Logo Pokemon" className={s.imgLogo}/></button></Link>

            <Search/>
            
            <Link to="/home/create"><button id={s.btnCreate}>Create Poke</button></Link>
            
        </div>
    )
}

export default NavBar
