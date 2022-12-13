import { NavLink, useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';
import styled from '@emotion/styled';

const MyStyledH1 = styled.h1`
  font-size: 5rem;
  color: green;
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
            <MyStyledH1>Welcome to Remix</MyStyledH1>
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
