import React from 'react'
import { Link } from 'react-router-dom'
import IMG from './404.png'
import s from './pageNotFound.module.css'

const PageNotFound = () => {
    return (
        <div className={s.container}>
            <div className={s.first}>
                <h1>Page not found </h1>   
                <h2>Sorry, the page you want to access is not available.</h2>
            </div>
            <img src={IMG} alt="404" id={s.IMG} />
            
            <div>
            <h3>We recommend that you access this link.</h3>
                <Link to='/' className={s.LINK}><li>Landing page</li></Link>
            </div>
            
        </div>
    )
}

export default PageNotFound
