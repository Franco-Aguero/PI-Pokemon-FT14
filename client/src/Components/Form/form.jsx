import axios from 'axios';
import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import TypeUI from '../Views/typeUI';

import s from './form.module.css'

const Form = () =>{
    const store = useSelector(state => state.Types);
    const [input, setInput] = useState({
        name:'',
        hp:'',
        defense:'',
        special_defense:'',
        attack:'',
        special_attack:'',
        weight: '',
        auxTypes:'',
        types:[],
        speed:'',
        height:'',
        image:""  || "https://cdn.icon-icons.com/icons2/850/PNG/128/Ash_icon-icons.com_67492.png"
    })

    const handelChange = (t) => { /* t = e.target */
        setInput(prev => ({...prev, [t.name]: t.value}))
    };

    const addType = (e) =>{
        (input.types.findIndex(el => el.name === input.auxTypes) === -1)?  
        setInput(prev => ({...prev, types: [...prev.types, store.find(el => el.name === prev.auxTypes)], auxTypes:''}))
        :alert("ya se encuentra")
    }

    const handelSubmit = async(e) => {
        try{
            e.preventDefault();
            const res = await axios.post('http://localhost:3001/pokemons', input);
            alert(res.data);
        }
        catch(err){
            alert(err)
        }
        finally {
            setInput({
                name:'', hp:'', defense:'', special_defense:'', attack:'', special_attack:'', weight: '', 
                auxTypes:"", types:[], speed:'', height:'', image:''
            })
        }
        
    };

    const deleteType = (e) =>{
        let id = e.target.value
        setInput({...input, types: input.types.filter(el => el.id !== parseInt(id))})
    };
    
    return (
        <div className={s.body}>

            <form className={s.form} onSubmit={ (e) =>  handelSubmit(e)}>
                
                <div className={s.rowOne}>
                    <article>
                        <label>Name: </label>
                        <input type="text" className={s.inputNameAndTypes} name='name' value={input.name} onChange={ (e) => handelChange(e.target)} /> 
                    </article>
                    
                    <article>
                        <label>Hp: </label>
                        <input type="number" className={s.inputGnral} name='hp' value={input.hp} onChange={ (e) => handelChange(e.target)} />
                    </article>
                    
                    <article>
                        <label>Defense: </label>
                        <input type="number" className={s.inputGnral} name='defense' value={input.defense} onChange={ (e) => handelChange(e.target)} /> 
                    </article>

                    <article>
                        <label>Attack: </label>
                        <input type="number" className={s.inputGnral} name='attack' value={input.attack} onChange={ (e) => handelChange(e.target)} />
                    </article>    

                    <article>
                        <label>Weight: </label>
                        <input type="number" className={s.inputGnral} name='weight' value={input.weight} onChange={ (e) => handelChange(e.target)} /> 
                    </article>  
                </div>

                <div className={s.rowTwo}>
                    <article>
                        <label>Types: </label>
                            <select name="auxTypes" className={s.selectTypes} value={input.auxTypes} onChange={ (e) => handelChange(e.target)}>
                                <option key='0' defaultValue=''></option>
                                { store.map(el => <option key={el.id} >{el.name}</option>)}
                            </select>
                            <button type='button' id={s.btnAddTypes} onClick={ (e) => input.types.length < 2 && input.auxTypes?addType(e):null}>{input.types.length < 2?'Add':'Full'}</button>
                    </article>

                    <article>
                        <label>Speed: </label>
                        <input type="number" className={s.inputGnral} name='speed' value={input.speed} onChange={ (e) => handelChange(e.target)}/>   
                    </article>

                    <article>
                        <label>Special Defense: </label>
                        <input type="number" className={s.inputGnral} name='special_defense' value={input.special_defense} onChange={ (e) => handelChange(e.target)} />     
                    </article>
                    
                    <article>
                        <label>Special Attack: </label>
                        <input type="number" className={s.inputGnral} name='special_attack' value={input.special_attack} onChange={ (e) => handelChange(e.target)} /> 
                    </article> 

                    <article>
                        <label>Height: </label>
                        <input type="number" className={s.inputGnral} name='height' value={input.height} onChange={ (e) => handelChange(e.target)} />
                    </article>
                </div>
                
                <div className={s.rowThree}>
                    {input.name? <h4 id={s.NameOfPoke}>{input.name}</h4> : null}

                    { input.image ? <img src={input.image} alt="Pokemon" id={s.imgPoke} /> : <h4>Waiting for pokemon ...</h4>}
                    
                    {input.types.length > 0 ? <div id={s.containerOfTypes}> {input.types.map( el => <TypeUI key={el.id} name={el.name} id={el.id} deleteTpe={deleteType}/> )} </div>: null}
                    
                    <select name="image" className={s.inputSelectIMG} value={input.image} onChange={(e) => handelChange(e.target)}>
                        <option key="1" value="https://cdn.icon-icons.com/icons2/850/PNG/128/Ash_icon-icons.com_67492.png" defaultValue>Ash</option>
                        <option key="2" value="https://img.icons8.com/color/50/000000/egg-pokemon.png" >Egg</option>
                        <option key="3" value="https://cdn.icon-icons.com/icons2/850/PNG/128/037_Pikachu_icon-icons.com_67297.png" >Pikachu</option>
                        <option key="4" value="https://cdn.icon-icons.com/icons2/850/PNG/128/Ultraball_icon-icons.com_67446.png" >Ultraball</option>
                    </select>
                    
                </div>
                <button type='submit' id={s.btnSubmit}> Send </button>

            </form>
            
        </div>
    )
}

export default Form;