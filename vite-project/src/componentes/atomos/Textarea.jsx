import React from "react";

const Textarea=({id, name,value , onChange})=>{
    return(
        <textarea id={id} name={name} value={value} onChange={onChange} ></textarea>
    );
}

export default Textarea;