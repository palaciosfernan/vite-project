import React from 'react';


const Icon = ({icon, text}) =>{
        return(
            <div className='siderbar-icon'>
                       
                                <div className='container-icon'>
                                        <i className={`material-icons`}>{icon}</i>
                                </div> 
                                <div className='container-icon'>
                                        <span>{text}</span>
                                </div>    
           </div>
        );   
}

export default Icon;