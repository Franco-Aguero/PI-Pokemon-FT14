import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKE_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKE_BY_ID = "GET_POKEMON_BY_ID";
export const GET_TYPES_OF_POKE = "GET_TYPES_OF_POKE";
export const SET_STORE = "SET_STORE";

export const getPrincipal = (name, type) =>{  /* PRIMERA RUTA */

    return async function dispatch(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/pokemons?name=${name}&type=${type}`);
            console.log(data.length)
            dispatch({type: GET_POKEMONS, payload: data.length > 0 ? data : [null]})
        }
        catch(err){
            if(err.response?.status){
                if(err.response.status === 404){
                    return dispatch({type: GET_POKEMONS, payload: [null]})
                }
            }
            alert("UPSS... PASARON COSAS 1!!")
        }
        
    }  
}

export const getPokeByName = (name) =>{        /* GET FOR NAME */
    return async function dispatch(dispatch){
        try{
            const {data} = await axios.get(`http://localhost:3001/pokemons/specific?name=${name}`);
            dispatch({type:GET_POKE_BY_NAME, payload: data})
        }
        catch(err){
            if(err.response?.status){
                if(err.response.status === 404){
                    return dispatch({type: GET_POKE_BY_NAME, payload: null})
                }
            }
            alert("UPSS... PASARON COSAS 2!!")
        }
    }  
}

export const getPokeById = (id) =>{        /* GET FOR ID */

    return async function dispatch(dispatch){
        const {data} = await axios.get(`http://localhost:3001/pokemon/${id}`);
        dispatch({type:GET_POKE_BY_ID, payload: data})
    }  
}

export const getTypes = () =>{        /* GET TYPES */

    return async function dispatch(dispatch){
        const {data} = await axios.get('http://localhost:3001/types');
        dispatch({type:GET_TYPES_OF_POKE, payload: data})
    }   
}

export const createPokemon = async () => {
    const resultadoOfCreater = await axios.post('http://localhost:3001/pokemons');
    alert(resultadoOfCreater)
}

export const setearStore = () =>{
    return {type:SET_STORE, payload:[]}
}
