import type {HeadFC} from 'gatsby';
import * as React from 'react';
import {Footer, Hero, Navigation, WhyUseSection} from '../components';
import '../global.css';

const IndexPage = () => {
  return (
    <main>
      <Navigation />
      <Hero />
      <WhyUseSection />
      <Footer />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
