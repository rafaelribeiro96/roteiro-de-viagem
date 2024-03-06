import React from 'react';
import styles from './HighlightedTitle.module.css';
import ButtonLayout from '../ButtonLayout/ButtonLayout';

const HighlightedTitle = () => {
  return (
    <div className={styles['highlighted-title']}>
      <h1 className={styles['h1-highlighted']}>
        Roteiro{' '}
        <span className={styles['h1-highlighted-destaque-dourado']}>p</span>
        Feito transforma suas{' '}
        <span className={styles['h1-highlighted-destaque']}>viagens</span>
        <br />
        em memórias eternas
      </h1>
      <h2 className={styles['h2-highlighted']}>
        Roteiro{' '}
        <span className={styles['h1-highlighted-destaque-dourado']}>p</span>
        Feito é a sua ferramenta de planejamento de viagens personalizado,
        tornando cada jornada uma experiência inesquecível. Descubra destinos,{' '}
        <span className={styles['h2-highlighted-destaque']}>
          crie roteiros
        </span>{' '}
        sob medida e embarque em aventuras sob medida para você.{' '}
      </h2>
      <ButtonLayout textoBotao="Começar" linkBotao="#travel" />
    </div>
  );
};

export default HighlightedTitle;
