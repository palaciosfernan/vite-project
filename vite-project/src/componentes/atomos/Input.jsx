import React from 'react';

const Input=({name , type , id,value,onChange})=>{
        return(
            <input name={name} type={type} id={id} value={value} onChange={onChange} />
        );
}
export default Input;