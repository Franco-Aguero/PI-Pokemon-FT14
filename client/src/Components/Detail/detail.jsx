import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokeById, setearStore } from '../../Actions/actions';
import CardDetail from '../Views/cardDetail';

import s from './detail.module.css'

const Detail = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.Detail);
    const {id} = useParams();
    
    useEffect( () => {
        dispatch(getPokeById(id));
        return () => dispatch(setearStore())
    },[dispatch, id]);
    

    return (
        <div className={s.container}>
            {
                !(Object.entries(store).length === 0) ?
                (
                    <CardDetail 
                    id={store.id}
                    name={store.name}
                    image={store.image}
                    types={store.types}
                    statistics={store.statistics}
                    height={store.height}
                    weight={store.weight}
                    /> 
                )

                : <h1>Cargando..</h1>  
            }
        </div>
    )
}

export default Detail;