import type { Page } from '@org/cms';
import { RichText } from '../RichText';
import { css } from '@emotion/react';

type ContentTypeProps = Page['layout'][0];

const screen = {
  tablet: "@media (min-width: 680px)",
  desktop: "@media (min-width: 920px)"
}

const contentStyle = css`
  width: 80vw;
  margin: auto;
  padding-top: 3rem;
  & h1 {
    font-size: 1.75rem;
    margin: 1rem 0 0 0;
    line-height: 2rem;
    text-align: center;
    ${screen.desktop} {
      font-size: 3rem;
      line-height: 3.25rem;
    }
  }
  & p {
    text-align: justify;
    line-height: 1.75rem;
  }
`;

export const Content = (props: ContentTypeProps) => {
    if (props.blockType !== 'content') return null;
    const { content } = props;

    return (
        <div css={contentStyle}>
            <RichText content={content} />
        </div>
    );
};
