import React from 'react';
import * as S from './style';

export const Footer = () => {
  return (
    <S.Container>
      <article className="footer-top">Gerome is MIT-licensed open-source software project by Rehan</article>
      <hr className="footer-middle-ruller" />
      <article className="footer-bottom">© 2022 Gerome, Inc. All rights reserved.</article>
    </S.Container>
  );
};
