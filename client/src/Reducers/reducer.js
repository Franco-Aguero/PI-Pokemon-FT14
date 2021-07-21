import { GET_POKEMONS, GET_POKE_BY_NAME, GET_POKE_BY_ID, GET_TYPES_OF_POKE, SET_STORE} from "../Actions/actions";
const initialState = {
    Pokemons: [],
    Detail: {},
    Types:[]
}

function rootReducers(state = initialState, action){

    switch (action.type) {

        case SET_STORE:
            return {...state, Pokemons:action.payload, Detail:{}}

        case GET_POKEMONS:
            return {...state, Pokemons:action.payload}
        
        case GET_POKE_BY_NAME:
            return {...state, Pokemons:[action.payload]}

        case GET_POKE_BY_ID:
            return {...state, Detail:action.payload}

        case GET_TYPES_OF_POKE:
            return {...state, Types:action.payload}
    
        default:
            return state
    }
}
export default rootReducers;