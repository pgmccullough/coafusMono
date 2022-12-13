import type { Page, User } from '@org/cms';
import type {
    ErrorBoundaryComponent,
    LinksFunction,
    LoaderFunction,
    MetaFunction,
    TypedResponse,
} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';
import { Header } from './components/Header/Header';

import uiStyles from '@org/ui/styles.css';
import styles from './styles/global.css';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'Payload CMS & Remix Monorepo',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
    {
        rel: 'stylesheet',
        href: uiStyles,
    },
    {
        rel: 'stylesheet',
        href: styles,
    },
];

export type RootLoaderData = {
    pages: Page[];
    user?: {
        user?: User;
        token?: string;
        exp?: number;
    };
};
export const loader: LoaderFunction = async ({
    context: { payload, user },
    request,
}): Promise<RootLoaderData | TypedResponse<never>> => {
    // const { pathname } = new URL(request.url);
    // if (pathname === '/') {
    //     return redirect('/home');
    // }

    const { docs: pages } = await payload.find({
        limit: 100,
        collection: 'pages',
        user,
        overrideAccess: false,
    });

    return { pages, user };
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                {typeof document === "undefined"
                ? "__STYLES__"
                : null}
            </head>
            <body>
                <Header />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <div>ERROR: {error.message}</div>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
};
