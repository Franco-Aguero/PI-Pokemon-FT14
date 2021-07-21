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

            <Link to='/home'><button className={s.btnLoading} onClick={() => types()}>POKEMON</button></Link>

        </div>
    )
}

export default LoadingPage;
