import { PassThrough } from 'stream';
import type { EntryContext } from '@remix-run/node';
import { Response } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToPipeableStream, renderToString } from 'react-dom/server';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

const key = 'css';
const cache = createCache({ key });
const {
  extractCriticalToChunks,
  constructStyleTagsFromChunks,
} = createEmotionServer(cache);

const ABORT_DELAY = 5000;

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    let markup = renderToString(
        <CacheProvider value={cache}>
          <RemixServer context={remixContext} url={request.url} />
        </CacheProvider>
    );
    
    const chunks = extractCriticalToChunks(markup);
    const styles = constructStyleTagsFromChunks(chunks);

    markup = markup.replace('__STYLES__', styles);
    return new Promise((resolve, reject) => {
        let didError = false;

        const { pipe, abort } = renderToPipeableStream(
            <CacheProvider value={cache}>
                <RemixServer context={remixContext} url={request.url} />
            </CacheProvider>,
            {
                onShellReady: () => {
                    const body = new PassThrough();

                    responseHeaders.set('Content-Type', 'text/html');
                    resolve(
                        //new Response(body, {
                        new Response("<!DOCTYPE html>" + markup, {
                            headers: responseHeaders,
                            status: didError ? 500 : responseStatusCode,
                        })
                    );

                    pipe(body);
                },
                onShellError: (err) => {
                    reject(err);
                },
                onError: (error) => {
                    didError = true;

                    console.error(error);
                },
            }
        );

        setTimeout(abort, ABORT_DELAY);
    });
}
