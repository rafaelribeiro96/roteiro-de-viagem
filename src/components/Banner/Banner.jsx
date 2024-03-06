import React from 'react';
import ButtonLayout from '../ButtonLayout/ButtonLayout';
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <div className={styles.banner_container}>
      <div className={styles['banner-content']}>
        <h3 className={styles['mini-title-banner']}>ENTRE EM CONTATO</h3>
        <h1 className={styles['main-title-banner']}>
          Quer saber mais sobre o projeto?
        </h1>
        <ButtonLayout
          textoBotao="Entre em contato"
          linkBotao="https://www.instagram.com/rafaelribeirotech/"
        />
      </div>
    </div>
  );
}
