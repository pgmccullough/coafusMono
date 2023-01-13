import { Global, css } from '@emotion/react';
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
import { Footer } from './components/Footer/Footer';

import { fontFace } from './assets/typography/typography';
import uiStyles from '@org/ui/styles.css';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'The College of Arms Foundation',
    viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
    {
        rel: 'stylesheet',
        href: uiStyles,
    }
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

    const { docs: pages } = await payload.find({
        limit: 100,
        collection: 'pages',
        user,
        overrideAccess: false,
    });

    return { pages, user };
};

const globalCSS = css`
*,*:before,*:after {
  box-sizing: border-box
}

${fontFace}

body{ 
    margin: 0;
}
`

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
                <Global styles={globalCSS} />
                <Header />
                <Outlet />
                <Footer />
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
