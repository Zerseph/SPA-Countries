import React from 'react';
import { Link } from 'react-router-dom';
import landingPageStyles from './LandingPage.module.css'; // Asegúrate de tener estilos para la LandingPage

function LandingPage() {
  return (
    <div className={landingPageStyles.container}>

        {/* Contenido de la LandingPage */}
        <h1 className={landingPageStyles.styleText}>Welcome to AdventureApp</h1>
        <p className={landingPageStyles.styleText}>Discover new activities and exciting destinations with this SPA made by Agustin Lozada</p>

        {/* Botón para redirigir al Home */}
        <Link to="/home"><button className={landingPageStyles.exploreButton}>Explore</button></Link>
        
    </div>
  );
}

export default LandingPage;