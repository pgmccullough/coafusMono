import { Outlet, useMatches } from '@remix-run/react';
import { css } from '@emotion/react';
import type { RootLoaderData } from '~/root';

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const content = css`
  position: relative;
  top: 5.5rem;
  ${screen.tablet} {
    top: 3rem;
  }
`;

export default function Index() {
    const matches = useMatches();

    const [{ data }] = matches;
    const { pages, user } = (data as RootLoaderData) || {};

    return !pages ? (
        <div></div>
    ) : (
        <div css={content}>
            <Outlet />
        </div>
    );
}
