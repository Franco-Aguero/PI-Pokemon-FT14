import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokeByName, setearStore } from '../../../Actions/actions'; 
import Lupa from './lupa.png'
import s from './search.module.css'

 function Search() {
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name:''
    })

    function handleChange(e){
        setInput({name: e.target.value})
       
    }
    function handleSubmit(e){
        e.preventDefault() 
        dispatch(getPokeByName(input.name.toLowerCase()));
        dispatch(setearStore())
        setInput({name:''})
    }
     return (
         
        <div className={s.container}>
            <input type="text" className={s.input} name="name" value={input.name} onChange={(e) => handleChange(e)} placeholder="search by name..."  />
            <button onClick={(e) => handleSubmit(e)} id={s.btnSubmit}><img src={Lupa} alt="lupa search" id={s.IMG} /></button>
        </div>
         
     )
 }
 
 export default Search;