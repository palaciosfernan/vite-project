import React from 'react';
import './button.scss';

const Button=({name})=>{
    return(
        <button className='boton'>{name}</button>
    );
};

export default Button;