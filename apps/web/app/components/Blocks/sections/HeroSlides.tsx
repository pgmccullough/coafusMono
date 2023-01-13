import type { Page } from '@org/cms';
import { Link } from '@remix-run/react';
import { RichText } from '../RichText';
import { css } from '@emotion/react';

type HeroSlideProps = Page['layout'][0];

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const slides = css`
  position: relative;
  overflow: hidden;
  width: 100vw;
  min-height: 20rem;
  height: 40vh;
  border-bottom: 6px #010193 solid;
  &::before {
    box-shadow: inset 0px 0px 10px 0px #000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
  }
  ${screen.tablet} {
    min-height: 30rem;
    height: 70vh;
  }
`;

const slide__container = css`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const slide__contents = css`
  display: flex;
  width: 100%;
  & > * {
    flex: 1;
  }
`;

const slide__text = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 20rem;
  height: 40vh;
  color: #fff;
  font-family: 'COAF Sans';
  text-align: center;
  font-size: 1.5rem;
  line-height: 3rem;
  margin-top: 3rem;
  & h1 {
    font-size: 4rem;
    font-weight: 400;
    margin: 0;
  }
  & a {
    color: #fff;
  }
  ${screen.tablet} {
    min-height: 30rem;
    height: 70vh;
    justify-content: center;
  }
  ${screen.desktop} {
    font-size: 2rem;
    line-height: 4rem;
  }
`;

const slide__description = css`
  width: 90%;
`;

const featured__image = css`
  display: none;
  text-align: center;
  ${screen.tablet} {
    display: block;
    & img {
      margin-top: 6rem;
      width: 70%;
      box-shadow: 0 0 6px 0 #000;
    }
  }
`;

export const HeroSlides = (props: HeroSlideProps) => {
  if (props.blockType !== 'heroslides') return null;
  const { heroSlides: heroSlideArray } = props;
  return (
    <>
    {heroSlideArray.map(slide => 
      <div 
        css={slides}
        key={slide.id}
      >
        <div
          css={slide__container}
          style={{backgroundImage: `url('${slide.backgroundImage.url}')`}}
          role="img"
          aria-label={slide.backgroundImage.alt}
        >
          <div css={slide__contents}>
            {slide.featuredImage?.url
              ?<div css={featured__image}>
                <img
                  src={slide.featuredImage.url}
                />
              </div>
              :""
            }
            <div css={slide__text}>
              {slide.link?.slug
                ?<h1><Link to={slide.link.slug}>{slide.title}</Link></h1>
                :<h1>{slide.title}</h1>
              }
              <div css={slide__description}><RichText content={slide.description} /></div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}