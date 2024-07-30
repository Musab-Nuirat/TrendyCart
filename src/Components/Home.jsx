import React from 'react'
import Products from "./Products";
import Cart from "./Cart";
import Landing from './Landing';
import Contact from './Contact';

const Home = () => {
  return (
    <>
        <Landing />
        <Products isHomepage={1} itemsPerPage={4}/>
        <Contact />
    </>
  );
}

export default Home