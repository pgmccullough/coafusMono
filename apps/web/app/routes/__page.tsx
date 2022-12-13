import { NavLink, Outlet, useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';

export default function Index() {
    const matches = useMatches();

    const [{ data }] = matches;
    const { pages, user } = (data as RootLoaderData) || {};

    let topLvlPages = pages.filter((page:any) => page.topLvl===true).sort((a:any,b:any)=>a.navOrder-b.navOrder)
    return !pages ? (
        <div></div>
    ) : (
        <div className="page">
            <Outlet />
        </div>
    );
}
