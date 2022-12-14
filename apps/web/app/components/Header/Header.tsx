/** @jsxImportSource @emotion/react */

import { NavLink, useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';
import { css } from '@emotion/react';

const header = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #fff;
`;

const header__title = css`
    font-family: 'COAF Serif';
    font-size: 3rem;
    font-weight: 300;
    color: #000;
    border: 1px red solid;
`;

const header__links = css`
    display: flex;
    font-family: sans;
`;

const header__subLink = css`
    display: block;
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
                        <div key={page.slug}>
                            {!page.isDummy?
                                <NavLink to={page.slug ?? '/'}>
                                    {page.title}
                                </NavLink>:
                                <>{page.title}</>
                            }
                            {subPages.length?
                                <div className="subNavContainer">
                                {subPages.map(subPage => 
                                        <NavLink 
                                            key={subPage.slug} 
                                            to={subPage.slug ?? '/'}
                                            css={header__subLink}
                                        >
                                            {subPage.title}
                                        </NavLink>
                                )}
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
