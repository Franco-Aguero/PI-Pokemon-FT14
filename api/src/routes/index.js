const axios = require('axios');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Pokemon, Tipo} = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function get40(){
    var url = "https://pokeapi.co/api/v2/pokemon";
    const {data} = await axios.get(url);
    var contenido = data;
    let array = [];
    
    while (array.length < 40 && contenido.next){
        
        array = array.concat(contenido.results);
        const {data} = await axios.get(contenido.next);
        contenido = data;
        
    }
    
    return array

}

async function list(array){/* Trae los Datos/INFO de los 40 Pokemons */
       
        var resul =  array.map(async(el) =>{
            let {data} = await axios.get(el.url);
            let obj={
                id: data.id,
                name:data.name, 
                image: data.sprites.front_default, 
                types: {slot_1 : data.types[0].type.name, slot_2: data.types[1]? data.types[1].type.name: null},
                attack: data.stats[1].base_stat
            }
            return obj
        })
        
        return Promise.all(resul)
    
}

async function getBd(){
    const bdPokemons = await Pokemon.findAll({include: Tipo});
    const listBd = bdPokemons.map( (data) =>{
        let obj={
            id: data.id,
            name:data.name, 
            image: data.image, 
            types: data.tipos.length > 1 ? {slot_1 : data.tipos[0].name, slot_2: data.tipos[1].name }
            :{slot_1: data.tipos[0].name},
            attack: data.attack
            /* CUANDO LOGRE VER COMO MANDAR LOS TIPOS AL CREAR, SOLUCIONAR AQUI */
        }
        return obj
    });
    return listBd;
}

async function filterId(id){
    const rege = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if(rege.test(id)){ 
        const bdPoke = await Pokemon.findByPk(id, {include: Tipo}); 
        const obj = {
            id: bdPoke.id, 
            name: bdPoke.name, 
            image: bdPoke.image? bdPoke.image : null, 
            types: bdPoke.tipos.length > 1 ? {slot_1 : bdPoke.tipos[0].name, slot_2: bdPoke.tipos[1].name }
            :{slot_1: bdPoke.tipos[0].name}, 
            statistics:{ 
                hp: bdPoke.hp, 
                defense: bdPoke.defense, 
                special_defense: bdPoke.special_defense, 
                attack: bdPoke.attack, 
                special_attack: bdPoke.special_attack, 
                speed: bdPoke.speed
            },
            height: bdPoke.height,
            weight: bdPoke.weight
        };
        return obj 
    }
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`);
    const pokemon ={
        id: data.id,
        name:data.name, 
        image: data.sprites.front_default, 
        types: {slot_1 : data.types[0].type.name, slot_2: data.types[1]? data.types[1].type.name: null},
        statistics:{
                hp: data.stats[0].base_stat,  
                defense: data.stats[2].base_stat,
                special_defense: data.stats[4].base_stat,
                attack: data.stats[1].base_stat,
                special_attack: data.stats[3].base_stat,
                speed: data.stats[5].base_stat 
        },
        height: data.height,
        weight: data.weight
    }
    return pokemon;
};

async function filterName(name){ 
    const bdPoke = await Pokemon.findOne({ where: { name: name}, include: Tipo });
    if(bdPoke){
        const obj = {
            id: bdPoke.id, 
            name: bdPoke.name, 
            image: bdPoke.image, 
            types:bdPoke.tipos.length > 1 ? {slot_1 : bdPoke.tipos[0].name, slot_2: bdPoke.tipos[1].name }
            :{slot_1: bdPoke.tipos[0].name},
            statistics:{ 
                hp: bdPoke.hp, 
                defense: bdPoke.defense, 
                special_defense: bdPoke.special_defense, 
                attack: bdPoke.attack, 
                special_attack: bdPoke.special_attack, 
                speed: bdPoke.speed
            },
            height: bdPoke.height,
            weight: bdPoke.weight
        };
        return obj;
    }
    
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon ={
        id: data.id,
        name:data.name, 
        image: data.sprites.front_default, 
        types: {slot_1 : data.types[0].type.name, slot_2: data.types[1]? data.types[1].type.name: null},
        statistics:{
                hp: data.stats[0].base_stat, 
                attack: data.stats[1].base_stat, 
                defense: data.stats[2].base_stat,
                special_attack: data.stats[3].base_stat,
                special_defense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat 
        },
        height: data.height,
        weight: data.weight
    };
    return pokemon
}

async function filterTypes(){
    const {data} = await axios.get(`https://pokeapi.co/api/v2/type`);
    let ID = 1;
    const types = data.results.map(el => ({id: ID++, name: el.name}));
    return types;
}

function addTypesBD(types){
    types.map(async (el) => {
        const [tipo] = await Tipo.findOrCreate({
            where: { 
                id: el.id,
                name: el.name 
            }
          });
          return tipo;
    })
}




/* --------------------Rutas/path------------------- */


router.get('/pokemons',async (req,res) => {
    try{  
        const {name} = req.query;
        const {type} = req.query;
        const listBd = await getBd();
        if(name === "CREATED_BY_ME"){
            if(!listBd.length > 0){
                return res.status(404).send("No se encuentran pokemones en la bd")
            }
            return res.status(200).json(listBd)
        }
        const listApi = await list(await get40());
        if(name === "API"){
            return res.status(200).json(listApi)
        }  
        var mezc= [...listBd, ...listApi];
        if(name === "MEZCLA"){
            return res.status(200).json(mezc)
        }
        
        if(type){
            mezc = filterByType(type, mezc)
        }
        const filtAsce = await switcFilter(name, mezc);
        res.status(200).json(filtAsce)
    }
    catch(err){
        /* console.log(' FRANCO, AQUI COMIENZA EL ERRORRR -------', err) */
        res.status(404).json(err)
    }
 
})


router.get('/pokemon/:idPokemon',async (req,res) => {
    try{
        const idPokemon = req.params.idPokemon;
        const detail = await filterId(idPokemon)
        return res.status(200).json(detail)
    }
    catch(err){
        /* console.log(' FRANCO, AQUI COMIENZA EL ERRORRR -------', err) */
        /* SI FILTRO POR ID 0, SE ROMPE TODO, FIJARSE y SOLUCIONAR./ CREO QUE ESTA SOLUCIONADO CON LA LINEA DE ABAJO */
        res.status(404).send('No se encuentro un Pokemon con dicho id')
    }
 
})

router.get('/pokemons/specific', async (req,res) =>{
    try{
        const {name}= req.query;
        res.send(await filterName(name))
    }
    catch(err){
        /* console.log('se GENERO UN ERROR', err); */
        res.status(404).send('UPSS...El pokemon solicitado no se encuentra!!')
    }
})

router.post('/pokemons', async (req, res) => {
    try{
        const {name, hp, attack, defense, special_defense, special_attack, speed, height, weight, image, types} = req.body;
        const [poke, created] = await Pokemon.findOrCreate({
        where: {
            name: name.toLowerCase(),
            hp,
            attack,
            defense,
            special_defense,
            special_attack,
            speed,
            height,
            weight,
            image
        }
    })
    poke.setTipos( !(types.length > 1) ? [types[0].id] : [types[0].id, types[1].id])
    created?res.status(200).send("Se ah creado con exito!.")
    :res.status(200).send("Ya se encuentra un pokemon con los mismos datos. Formulario rechazado.")
    }
    catch(err){
        res.status(404).send("Upss, se rompio algo :(")
    }
   
})


router.get('/types', async (_req,res) => {
    try{
        await addTypesBD(await filterTypes());
        const bd = await Tipo.findAll();
        
        res.status(200).json(bd)
    }
    catch(err){
        console.log('HAYYY ONE ERROR',err);
        res.status(404).json(err)
    }
})

/* FUNCIONES DE ORDENAMIENTO */
function compareAlfa(a, b) {/* ORDENA DE LA A-Z POR ALFABETO */
    if (a.name < b.name) {
      return -1;
    }
    return 0;
};

function compareForce(a, b) {/* ORDENA POR FUERZA, DE  */
    if (a.attack < b.attack) {
      return -1;
    }
    return 0;
}

function switcFilter(name, array){
    switch (name) {

        case "A-Z":
            
          return array.sort(compareAlfa);

        case "Z-A":
            return array.sort(compareAlfa).reverse();
        
        case "WEAKER":
            return array.sort(compareForce);
          
        case "STRONGER":
            return array.sort(compareForce).reverse(); 
        default:
            throw new Error();
      }
}


function filterByType(type, array){
    const result = array.filter( el => el.types.slot_1 === type || el.types.slot_2 === type)
    return result;
}

module.exports = router;