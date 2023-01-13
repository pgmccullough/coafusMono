import { Outlet, useMatches } from '@remix-run/react';
import { css } from '@emotion/react';
import type { RootLoaderData } from '~/root';

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const content = css`
  position: relative;
  top: 6.5rem;
  margin-bottom: 10rem;
  font-family: 'COAF Sans';
  & h1 {
    font-family: 'COAF Serif';
    font-weight: 300;
  }
  ${screen.tablet} {
    top: 7rem;
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
