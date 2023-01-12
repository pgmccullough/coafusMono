/** @jsxImportSource @emotion/react */

import { NavLink, useMatches } from '@remix-run/react';
import { useRef, useState } from 'react';
import type { RootLoaderData } from '~/root';
import { css } from '@emotion/react';
import redStripes from '../../assets/subHead-red-stripes.svg';
import redStripesReverse from '../../assets/subHead-red-stripes-reverse.svg';
import headerArms from '../../assets/header_arms.png';
import searchIcon from '../../assets/search_magnifying.svg';

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const header = css`
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  background: #fff;
  padding: 1rem 0;
  z-index: 2;
  top: 0;
  ${screen.tablet} {
    height: 4rem;
    justify-content: space-evenly;
  }
`;

const header__title = css`
  margin: 0;
  font-family: 'COAF Serif';
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.5rem;
  text-align: left;
  color: #000;
  width: 12rem;
  margin-left: 5.5rem;
  ${screen.tablet} {
    width: 100vw;
    margin-left: 0;
    text-align: center;
    font-size: 2rem;
    line-height: 2rem;
  }
  ${screen.desktop} {
    width: 50vw;
    font-size: 3vw;
    line-height: 3vw;
  }
`;

const header__links = css`
  display: none;
  width: 50%;
  align-items: flex-end;
  font-family: 'COAF Sans';
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  padding: 0 5%;
  & a {
    color: black;
    text-decoration: none;
  }
  ${screen.desktop} {
    display: flex;
  }
`;

const header__linkContainer = css`
  position: relative;
  width: 33.33%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  &:hover .header__subContainer--padding {
    visibility: visible;
  } 
`

const header__subContainerPadding = css`
  position: relative;
  padding-top: 1rem;
  margin-bottom: -1rem;
  visibility: hidden;
`;

const header__subContainer = css`
  display: flex;
  background: #fff;
  position: absolute;
  border-top: 4px #010193 solid;
  border-bottom: 4px #010193 solid;
  margin: 0;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
  &:before {
    content: "";
    position: absolute;
    border-left: 6px transparent solid;
    border-right: 6px transparent solid;
    border-bottom: 6px #010193 solid;
    margin-top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const header__subLink = css`
  padding: 0.125rem 1rem;
  white-space: nowrap;
  &:hover {
    background: #eee;
  }
`;

const subHeader__wrap = css`
  position: fixed;
  filter: drop-shadow(0 0 6px #000);
  z-index: 1;
  top: 5rem;
  ${screen.tablet} {
    top: 4rem;
  }
`;

const subHeader = css`
  display: flex;
  width: 100vw;
  height: 1.5rem;
  background: #fff;
  left: 0vw;
  ${screen.tablet} {
    height: 3rem;
    clip-path: polygon(0% 0%,100% 0%,calc(100% - 3rem) 100%,3rem 100%);
  }
`;

const subHeader__left = css`
  position: relative;
  left: 0vw;
  width: 100vw;
  background: url('${redStripes}');
  ${screen.tablet} {
    width: 50vw;
  }
`;

const subHeader__right = css`
  display: none;
  width: 50vw;
  background: url('${redStripesReverse}');
  ${screen.tablet} {
    display: flex;
    justify-content: flex-end;
  }
`;

const subHeader__arms = css`
  position: fixed;
  z-index: 2;
  width: 69px;
  height: 94px;
  top: 0.5rem;
  left: 0.5rem;
  background: url('${headerArms}');
  ${screen.tablet} {
    top: 4rem;
    margin-top: -1rem;
    left: calc(50vw - 34.5px);
  }
`;

const subHeader__search__input = css`
  display: flex;
  height: 3rem;
  border-left: 4px #010193 solid;
  background: #fff;
  width: 0;
  transition: 0.25s;
  overflow: hidden;
`;

const subHeader__search__inputExpanded = css`
  width: calc(50vw - 12rem);
`;

const subHeader__search__inputInner = css`
  border: 0;
  height: 3rem;
  width: calc(50vw - 12rem);
  padding-left: 1rem;
  font: 1.5rem 'COAF Sans';
`;

const subHeader__search__collapse = css`
  font: 2.5rem 'COAF Sans';
  font-weight: 700;
  transform: rotate(45deg);
  margin: 0 0.25rem;
  cursor: pointer;
`;

const subHeader__search = css`
  background: #010193 url('${searchIcon}') no-repeat;
  background-size: 2rem;
  background-position: 1rem;
  width: 6.5rem;
  height: 3rem;
  cursor: pointer;
`;

const mobileMenu = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 0;
  right: 0;
  top: 0;
  z-index: 2;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  ${screen.tablet} {
    display: none;
  }
`;

const mobileMenu__bars = css`
  position: relative;
  width: 3.5rem;
  height: 0.4rem;
  background: #010193;
  transition: 0.5s;
`;

const mobileMenuBar__close1 = css`
  transform: rotate(45deg) translate(0.5rem, 0.5rem);
`

const mobileMenuBar__close2 = css`
  width: 0;
  margin-left: 1.75rem;
`

const mobileMenuBar__close3 = css`
  transform: rotate(-45deg) translate(0.75rem, -0.75rem);
`

const mobileMenuContainer = css`
  position: fixed;
  top: 6.5rem;
  width: 100vw;
  height: calc(100vh - 6.5rem);
  background: #010193;
  left: 100vw;
  transition: 0.25s;
  color: #ccc;
  font-family: 'COAF Sans';
  padding: 2rem;
  text-transform: uppercase;
  line-height: 2rem;
  & a {
    color: #ccc;
    display: block;
    text-decoration: none;
  }
  & h1 {
    font-family: 'COAF Serif';
    margin: 1rem 0 0 -0.5rem;
    font-weight: 300;
    line-height: 3rem;
  }
  ${screen.tablet} {
    display: none;
  }
`;

const mobileMenuContainer__vis = css`
  left: 0;
`;
  
export const Header = () => {
    const matches = useMatches();

    const [ searchVis, setSearchVis ] = useState<boolean>( false );
    const [ searchTerm, setSearchTerm ] = useState<string>( "" );
    const [ mobileMenuExpand, setMobileMenuExpand ] = useState<boolean>( false );

    const searchInputEl = useRef<HTMLInputElement>( null );

    const [{ data }] = matches;
    const { pages, user } = (data as RootLoaderData) || {};

    let topLvlPages = pages.filter(
        (page:any) => page.topLvl===true
    ).sort(
        (a:any,b:any)=>a.navOrder-b.navOrder
    )

    const searchClick = () => {
      if(searchVis) {
        // Search function goes here
        console.log(searchTerm);
      } else {
        setSearchVis(true);
        searchInputEl.current?.focus();
      }
    }

    return !pages ? (
        <div></div>
    ) : (
      <>
        <nav css={header}>
          <h1 css={header__title}>College of Arms Foundation</h1>
          <div css={header__links}>
            {topLvlPages?.map((page:any) => {
                const subPages = pages.filter((subPage:any) => 
                    subPage.parentNav && subPage.parentNav.length
                        ?subPage.parentNav[0]?.id===page.id
                        :""
                );
                return (
                  <div 
                    key={page.slug}
                    css={header__linkContainer}
                  >
                      {!page.isDummy?
                          <NavLink to={page.slug ?? '/'}>
                              {page.title}
                          </NavLink>:
                          <>{page.title}</>
                      }
                      {subPages.length?
                        <div 
                          css={header__subContainerPadding}
                          className="header__subContainer--padding"
                        >
                        <div css={header__subContainer}>
                        {subPages.map(subPage => 
                                <NavLink 
                                    key={subPage.slug} 
                                    to={subPage.slug ?? '/'}
                                    css={header__subLink}
                                >
                                    {subPage.title}
                                </NavLink>
                        )}
                        </div>
                        </div>:
                        ""
                      }
                  </div>
                )
            })}
          </div>
          <div css={mobileMenu} onClick={() => setMobileMenuExpand(!mobileMenuExpand)}>
            <div css={[mobileMenu__bars,mobileMenuExpand?mobileMenuBar__close1:""]} />
            <div css={[mobileMenu__bars,mobileMenuExpand?mobileMenuBar__close2:""]} />
            <div css={[mobileMenu__bars,mobileMenuExpand?mobileMenuBar__close3:""]} />
          </div>
        </nav>
        <div css={subHeader__wrap}>
          <div css={subHeader}>
            <div css={subHeader__left} />
            <div css={subHeader__right}>
              <div css={[subHeader__search__input,searchVis?subHeader__search__inputExpanded:""]}>
                <input 
                  css={subHeader__search__inputInner}
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  ref={searchInputEl}
                  value={searchTerm}
                />
                <div 
                  css={subHeader__search__collapse}
                  onClick={() => setSearchVis(false)}
                >+</div>
              </div>
              <div 
                css={subHeader__search}
                onClick={searchClick}
              />
            </div>
          </div>
        </div>
        <div css={subHeader__arms} />
        <div css={[mobileMenuContainer,mobileMenuExpand?mobileMenuContainer__vis:""]}>
          {topLvlPages?.map((page:any) => {
            const subPages = pages.filter((subPage:any) => 
              subPage.parentNav && subPage.parentNav.length
                ?subPage.parentNav[0]?.id===page.id
                :""
            );
            return (
              <div key={`${page.slug}_mobile`}>
                {!page.isDummy
                  ?<NavLink
                    onClick={() => setMobileMenuExpand(false)}
                    to={page.slug ?? '/'}
                  >
                    <h1>{page.title}</h1>
                  </NavLink>
                  :<h1>{page.title}</h1>
                }
                {subPages.length
                  ?<div>
                    {subPages.map(subPage => 
                      <NavLink 
                        key={`${subPage.slug}_mobile`}
                        onClick={() => setMobileMenuExpand(false)}
                        to={subPage.slug ?? '/'}
                      >
                        {subPage.title}
                      </NavLink>
                    )}
                  </div>
                  :""
                }
              </div>
            )
          })}
        </div>
      </>
    );
}
