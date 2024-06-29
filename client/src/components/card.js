import React from 'react'
import { useNavigate } from 'react-router-dom'



export default function Card({item}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/item/${item.id}`, { state: {item} });
    };

    return (
        <div className='card' onClick={handleClick}>
            <img className='card-image' src={item.Image} alt={item.Name} />
            <h3 className='card-name'>{item.Name}</h3>
        </div>
    )
}