import React from 'react'
import styleCard from '../Utils/utils'
import s from './cardDetail.module.css'

const CardDetail = ({ id, name, image, types, statistics, height, weight}) => {
    const {style} = styleCard;
    const e = style;
    return (
        <div className={s.container} style={ e[types.slot_1] || e["default"]}>

            <div className={s.left}>
                <h3>{name}</h3>

                 <img src={image} alt={`foto de ${name}`}  className={s.IMG}/>
    
                <div className={s.types}>{types.slot_1} {types.slot_2 ? `/ ${types.slot_2}` : null}</div>

            </div>
            
            <div className={s.right}>
                <div>
                    <span>hp: {statistics.hp} </span> 
                    <span>Attack: {statistics.attack}</span>
                    <span>Defense: {statistics.defense}</span>
                    Height: {height} cm
                </div>

                <div>
                    <span>speed: {statistics.speed}</span>
                    <span>Special Attack: {statistics.special_attack}</span>
                    <span>Special Defense: {statistics.special_defense}</span>
                    Weight: {weight} gr
                </div>

            </div>
        </div>
    )
}

export default CardDetail;