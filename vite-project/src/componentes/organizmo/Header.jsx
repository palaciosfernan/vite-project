import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../atomos/Title';
import image from './../../assets/image_Logo.jpg';

const Header = () => {
    return (
        <>
            <header className='navbar '>
                <div className='img-content'>
                    <img src={image} width={78} height={110} alt="Logo"></img>
                </div>
                <div className='title-content'>
                    <Title />
                </div>
                <div className="card">
                    <div className='circle'>
                        <span className="material-symbols-outlined">
                            person
                        </span>
                    </div>
                    <div className='data'>
                        <Link to="/login">
                            <button>Iniciar sesión</button>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
