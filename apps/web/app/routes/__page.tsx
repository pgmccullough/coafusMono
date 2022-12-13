import { Outlet, useMatches } from '@remix-run/react';
import type { RootLoaderData } from '~/root';

export default function Index() {
    const matches = useMatches();

    const [{ data }] = matches;
    const { pages, user } = (data as RootLoaderData) || {};

    return !pages ? (
        <div></div>
    ) : (
        <div className="page">
            <Outlet />
        </div>
    );
}
