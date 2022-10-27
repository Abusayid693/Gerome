import React from 'react';
import {ButtonDark, ButtonLight} from '../button';
import * as S from './style';
// @ts-ignore
import bg from '../../images/bg/bg.svg';

export const Hero = () => {
  return (
    <S.Container style={{backgroundImage: `url(${bg})`}}>
      <article className="hero-header">
        <h1 className="hero-header-first">The Finance</h1>
        <h1 className="hero-header-second">Platform, All you need</h1>
      </article>
      <article className="hero-sub-header">
        <h3 className="hero-sub-header-1">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum saepe nulla </h3>
        <h3 className="hero-sub-header-2">Lorem ipsum, dolor sit amet consectetur </h3>
        <h3 className="hero-sub-header-3">Lorem ipsum, dolor sit </h3>
      </article>
      <article className="hero-link-group">
        <ButtonDark className="hero-link-group-link-1">Get Started</ButtonDark>
        <ButtonLight className="hero-link-group-link-2">Why use Gerome ?</ButtonLight>
      </article>
    </S.Container>
  );
};
