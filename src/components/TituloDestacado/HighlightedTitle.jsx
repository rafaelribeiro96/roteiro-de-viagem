import React from 'react';
import styles from './HighlightedTitle.module.css';
import ButtonLayout from '../ButtonLayout/ButtonLayout';
import Header from '../Header/Header';
import ImagemBackground from 'src/assets/images/paisagem2.jpg';
import Image from 'next/image';

const HighlightedTitle = () => {
  return (
    <div className={styles['highlighted-title-container']}>
      {/* <div className={styles.video}>
        <video autoPlay loop muted className={styles.video_background}>
          <source src="/videos/video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
        <div className={styles.video_overlay}></div>{' '}
      </div> */}
      <div className={styles.divImageBack}>
        <Image src={ImagemBackground} alt="Paisagem" className="imageBack" />
        <div className={styles.video_overlay}></div>{' '}
      </div>
      <div className={styles['highlighted-title']}>
        <Header />
        <h1 className={styles['h1-highlighted']}>
          Roteiro{' '}
          <span className={styles['h1-highlighted-destaque-dourado']}>p</span>
          Feito transforma suas viagens em memórias eternas
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
    </div>
  );
};

export default HighlightedTitle;
