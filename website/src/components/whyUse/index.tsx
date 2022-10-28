import React from 'react';
import * as S from './style';
// @ts-ignore
import icon1 from '../../images/icons/features/1.svg';

const features = [
  {
    title: 'consectetur',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In quis praesentium repellat inventore, aliquid recusandae dolores magni repudiandae facere autem nulla est harum nostrum qui alias eos numquam cum fuga.',
    icon: icon1
  },
  {
    title: 'consectetur',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In quis praesentium repellat inventore, aliquid recusandae dolores magni repudiandae facere autem nulla est harum nostrum qui alias eos numquam cum fuga.',
    icon: icon1
  },
  {
    title: 'consectetur',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In quis praesentium repellat inventore, aliquid recusandae dolores magni repudiandae facere autem nulla est harum nostrum qui alias eos numquam cum fuga.',
    icon: icon1
  },
  {
    title: 'consectetur',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In quis praesentium repellat inventore, aliquid recusandae dolores magni repudiandae facere autem nulla est harum nostrum qui alias eos numquam cum fuga.',
    icon: icon1
  },
  {
    title: 'consectetur',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In quis praesentium repellat inventore, aliquid recusandae dolores magni repudiandae facere autem nulla est harum nostrum qui alias eos numquam cum fuga.',
    icon: icon1
  },
  {
    title: 'consectetur',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In quis praesentium repellat inventore, aliquid recusandae dolores magni repudiandae facere autem nulla est harum nostrum qui alias eos numquam cum fuga.',
    icon: icon1
  }
];

export const WhyUseSection = () => {
  return (
    <S.Container>
      <article className="features-headings">
        <h2 className="features-title">Why use Gerome ?</h2>
        <h4 className="features-sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, itaque tempora!.</h4>
      </article>

      <article className="features">
        <ul className="features-list">
          {features.map(feature => (
            <li className="features-list-item">
              <div className="features-list-item-picture">
                <img className="features-list-item-img" src={feature.icon} />
              </div>
              <h6 className="features-list-item-title">{feature.title}</h6>
              <p className="features-list-item-content">{feature.content}</p>
            </li>
          ))}
        </ul>
      </article>
    </S.Container>
  );
};
