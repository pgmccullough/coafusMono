/** @jsxImportSource @emotion/react */

import { NavLink, useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';
import { css } from '@emotion/react';

const headerH1 = css`
  font-size: 5rem;
  color: #000;
  font-family: 'COAF Serif';
`;

export const Header = () => {
    const matches = useMatches();

    const [{ data }] = matches;
    const { pages, user } = (data as RootLoaderData) || {};

    let topLvlPages = pages.filter((page:any) => page.topLvl===true).sort((a:any,b:any)=>a.navOrder-b.navOrder)
    return !pages ? (
        <div></div>
    ) : (
        <div className="page">
            <nav>
            <h1 css={headerH1}>College of Arms Foundation</h1>
                <ul className="container">
                    <div className="nav-pages">
                        {topLvlPages?.map((page:any) => {
                            const subPages = pages.filter((subPage:any) => 
                                subPage.parentNav && subPage.parentNav.length
                                    ?subPage.parentNav[0]?.id===page.id
                                    :""
                            );
                            return (
                                <div key={page.slug}>
                                    <li key={page.slug}>
                                        {!page.isDummy?
                                            <NavLink to={page.slug ?? '/'}>
                                                {page.title}
                                            </NavLink>:
                                            <>{page.title}</>
                                        }
                                    </li>
                                    {subPages.length?
                                        <div className="subNavContainer">
                                        {subPages.map(subPage => 
                                            <li key={subPage.slug}>
                                                <NavLink to={subPage.slug ?? '/'}>
                                                    {subPage.title}
                                                </NavLink>
                                            </li>
                                        )}
                                        </div>:
                                        ""
                                    }
                                </div>
                            )
                        })}
                    </div>
                </ul>
            </nav>
        </div>
    );
}
