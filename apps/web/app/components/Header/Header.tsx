/** @jsxImportSource @emotion/react */

import { NavLink, useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';
import { css } from '@emotion/react';

const header = css`
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    width: 100%;
    background: #fff;
    padding: 1rem 0;
`;

const header__title = css`
  margin: 0;
  line-height: 3vw;
  font-family: 'COAF Serif';
  font-size: 3vw;
  font-weight: 300;
  text-align: center;
  color: #000;
  width: 50%;
`;

const header__links = css`
    display: flex;
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
  /* margin-top: 1rem; */
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

export const Header = () => {
    const matches = useMatches();

    const [{ data }] = matches;
    const { pages, user } = (data as RootLoaderData) || {};

    let topLvlPages = pages.filter(
        (page:any) => page.topLvl===true
    ).sort(
        (a:any,b:any)=>a.navOrder-b.navOrder
    )

    return !pages ? (
        <div></div>
    ) : (
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
        </nav>
    );
}
