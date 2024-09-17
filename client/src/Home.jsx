import React from 'react';
import Navbar from './components/Navbar';
import Grass from './assets/lawne.jpg'
import Main from './components/Main';
import Section from './components/Section';

const Home = () => {
    return (
        <div className={`h-screen bg-center bg-cover`} style={{ backgroundImage: `url(${Grass})` }}>
            <Navbar />
            <Main />
            <Section />
        </div>
    );
}

export default Home;
