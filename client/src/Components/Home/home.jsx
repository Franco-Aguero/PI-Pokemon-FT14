import React, { Fragment, useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import Card from '../Views/card';
import FilterBar from './filterBar';
import Charging from './charging';
import ByDefault from './byDefault';
import s from './home.module.css'

const Home = () =>{

    let store = useSelector(state => state.Pokemons);
    const max = Array.isArray(store) ? Math.floor(store.length / 12) : null;

    const [input, setInput] = useState({
        pagination: 0
    })


    const decrement = (e) => { setInput({...input, pagination: --e.target.value}) }

    const increment = (e) => { setInput({...input, pagination: ++e.target.value}) }

 
    useEffect( () => {/* MIRA EL DE REDUX, PARA HACER PAGINACION */
       restPagination();
    }, [ store]);

    const restPagination = () =>{
        setInput({pagination: 0})
    };

    const c = input.pagination * 12 ;     /* c("comienzo") */
    const f= c + 12;      /* f("final") */
    return( 
        <Fragment>

            <FilterBar/> 
            {  
            
            store.length >= 1? 
            (store[0] === null? <ByDefault/> :
            
            <div className={s.body}>
            
                

                <div className={s.contenedor}>
                    { store.slice(c, f).map( el => <div key={el.id}><Card   
                        id={el.id}
                        name={el.name}
                        image={el.image}
                        types={el.types}
                    />
                    </div>)}
                </div>
                
                    <div className={s.paginado}>
                        <div className={s.decrement}>{input.pagination !== 0 ? <button value={input.pagination} onClick={ (e) => decrement(e)}>{"<"}</button>: null}</div>
                            <div className={s.accountant}>{input.pagination}</div>
                        <div className={s.increment}>{input.pagination !== max ? <button value={input.pagination} onClick={ (e) => increment(e)}>{">"}</button> : null}</div>
                    </div>
                
                
            </div>)
            : <Charging/> }
        </Fragment>
    )
}

export default Home;