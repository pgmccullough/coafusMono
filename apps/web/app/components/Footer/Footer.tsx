import { NavLink, useMatches } from '@remix-run/react';
import { css } from '@emotion/react';
import type { RootLoaderData } from '~/root';

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const footer = css`
  background: #010193;
  color: #fff;
  display: block;
  padding: 1.5% 5% 5% 5%;
  & > * {
    flex: 1;
  }
  & a {
    color: #fff;
    text-decoration: none;
    &:hover {
      border-bottom: 1px dashed #fff;
    }
  }
  & h1 {
    font: 1.75rem 'COAF Serif';
    margin: 0;
    opacity: 0.6;
    ${screen.tablet} {
      font-size: 1.25rem;
    }
    ${screen.desktop} {
      font-size: 1.75rem;
    }
  } 
  & li {
    font-family: 'COAF Sans';
    font-size: 1rem;
    line-height: 1.75rem;
    list-style: none;
    opacity: 0.6;
    ${screen.tablet} {
      font-size: 0.75rem;
      line-height: 1.25rem;
    }
    ${screen.desktop} {
      font-size: 1rem;
      line-height: 1.75rem;
    }
  }
  ${screen.tablet} {
    display: flex;
  }
`;

export const Footer = () => {
  const matches = useMatches();

  const [{ data }] = matches;
  const { pages } = (data as RootLoaderData) || {};

  let topLvlPages = pages.filter(
      (page:any) => page.topLvl===true
  ).sort(
      (a:any,b:any)=>a.navOrder-b.navOrder
  )

  return (
    <div css={footer}>
      {topLvlPages?.map((page:any) => {
        const subPages = pages.filter((subPage:any) => 
          subPage.parentNav && subPage.parentNav.length
            ?subPage.parentNav[0]?.id===page.id
            :""
        );
        return (
          <div>
            {!page.isDummy
              ?<h1>
                <NavLink
                  to={page.slug ?? '/'}
                >
                  {page.title}
                </NavLink>
              </h1>
              :<h1>{page.title}</h1>
            }
            {subPages.length
              ?<div>
                {subPages.map(subPage => 
                  <li key={`${subPage.slug}_footer`}>
                    <NavLink 
                      to={subPage.slug ?? '/'}
                    >
                      {subPage.title}
                    </NavLink>
                  </li>
                )}
              </div>
              :""
            }
          </div>
        )
      })}
    </div>  
  )
}