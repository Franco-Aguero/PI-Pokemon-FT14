import React, { useState, useEffect } from 'react';
import { getPrincipal, setearStore } from '../../Actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import Search from '../NavBar/Search/search';
import s from './filterBar.module.css'

const FilterBar = () => {
    const dispatch = useDispatch();
    const optionsFilter = ['A-Z', 'Z-A', 'API', 'CREATED_BY_ME', "MEZCLA", 'WEAKER', 'STRONGER']
    const storeTypes = useSelector( state => state.Types);
    const [input, setInput] = useState({
        filtradoGnral:''||"A-Z",
        type:''
    })

    const handleChange = (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    useEffect( () => {
        dispatch(getPrincipal(input.filtradoGnral, input.type));
        return () => dispatch(setearStore())
    },[input.filtradoGnral, dispatch])

   

    return (
        <div className={s.container}>

            <div>
                <label>Type:  </label>
                <select name="type" className={s.SELECT} value={input.type} onChange={ (e) => handleChange(e)}>
                    <option defaultValue="">none</option>
                    { storeTypes.map(el => <option key={el.id}>{el.name}</option>)}
                </select>
            </div>

            <div>
                <label>Filter:  </label>
                <select name="filtradoGnral" className={s.SELECT} value={input.filtradoGnral} onChange={ (e) => handleChange(e)}>
                        {   optionsFilter.map(el => <option key={el}>{el}</option>)   }  
                </select>
            </div>
            <Search/>
        </div>
    )
}

export default FilterBar