import React from 'react'
import {Link} from 'react-router-dom'
import s from './card.module.css'

const Card = ({image, name, types, id}) => {
    return (
        <Link to={`/home/detail/${id}`} className={s.container}>
            
             <div className={s.header}>
                <img src={image} alt={`Pokemon ${name}` } className={s.Img} /> 
             </div>
               
             <div className={s.body}>
                <span>{name}</span>
             </div>

            <div className={s.footer}>
            {types.slot_1} {types.slot_2 ? `/ ${types.slot_2}` : null}
            </div>
            
        </Link>
    )
}

export default Card;
