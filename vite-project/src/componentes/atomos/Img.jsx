import React from 'react';


const Img= ({image , width, height}) =>{
        return(
            <img src={image} width={width} height={height}/>
        );
}

export default Img;