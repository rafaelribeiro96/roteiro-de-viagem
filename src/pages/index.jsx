import React, { useState, useEffect } from 'react';
import uparrow from '../assets/images/up-arrow.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HighlightedTitle from '../components/TituloDestacado/HighlightedTitle';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import Image from 'next/image';
import Head from 'next/head';
import TravelSuggestion from 'src/components/travel/TravelSuggestion';

const Main = () => {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowUp(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="div__body">
      <Analytics />
      <Head>
        <title>Roteiro Feito - Sua Viagem Planejada</title>
      </Head>
      <div className="container">
        {/* <div id="header" data-aos="fade-right">
          <Header />
        </div> */}
        <HighlightedTitle />
        {/* <div id="video" data-aos="fade-up">
          <Video />
        </div> */}
        <div id="travel" /* data-aos="fade-up" */>
          <TravelSuggestion />
        </div>
        <div id="banner" /* data-aos="fade-up" */>
          <Banner />
        </div>
        <div id="footer">
          <Footer />
        </div>
        {showUp && (
          <button className="show-up-button" onClick={scrollToTop}>
            <Image src={uparrow} alt="arrow-up" className="arrow-up" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
