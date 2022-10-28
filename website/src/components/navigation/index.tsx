import React from 'react';
import * as S from './style';
// @ts-ignore
import icon from '../../images/icon.png';
// @ts-ignore
import githubIcon from '../../images/social/github.svg';

import {ButtonLight} from '../button';

export const Navigation = () => {
  return (
    <S.Container>
      <article className="navigation-logo">
        <img className="navigation-logo-icon" src={icon} />
        <span className="navigation-logo-title">Gerome</span>
      </article>

      <article className="navigation-content">
        <ul className="navigation-button-list">
          <li className="navigation-button-list-item">
            <ButtonLight>Get started for free</ButtonLight>
          </li>
        </ul>

        <ul className="navigation-links-list">
          <li className="navigation-links-list-item">
            <img src={githubIcon} />
          </li>
        </ul>
      </article>
    </S.Container>
  );
};
