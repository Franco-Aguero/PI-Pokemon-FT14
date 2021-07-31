import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { getTypes } from '../../Actions/actions';
import s from './loadingPage.module.css';

const LoadingPage = () =>{
    const dispatch = useDispatch()

    const types = () =>{
        dispatch(getTypes())
    }
    return (
        <div className={s.body}>
            <span className={s.title}>POKÉMON</span>
            <Link to='/home'><span className={s.Next} onClick={() => types()}>Go!</span></Link>
        </div>
    )
}

export default LoadingPage;