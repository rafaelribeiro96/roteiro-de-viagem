import React from 'react';
import styles from './Header.module.css';
import linkedinsvg from '../../assets/images/linkedin.svg';
import instasvg from '../../assets/images/insta.svg';
import logoRoteiroFeito from '../../assets/images/RoteiroFeitoLateralTransparente.png';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles['left-section-header']}>
        <div className={styles['logo-header']}>
          <Link href="/">
            <Image
              src={logoRoteiroFeito}
              alt="Logo Rafael Ribeiro Dev"
              className={styles['logo-header-img']}
            />
          </Link>
        </div>
        <div className={styles['subtitle-header']}>Planeje, explore, viva!</div>
      </div>

      <div className={styles['right-section-header']}>
        <Link href="/" className={styles['link-header']}>
          HOME
        </Link>
        <Link href="/blog" className={styles['link-header']}>
          BLOG
        </Link>
        <Link
          href="https://www.linkedin.com/in/rafaelfeliperibeiro/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={linkedinsvg}
            alt="LinkedIn"
            className={styles['icon-header']}
          />
        </Link>
        <Link
          href="https://www.instagram.com/rafaelribeirotech/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={instasvg}
            alt="Instagram"
            className={styles['icon-header']}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
