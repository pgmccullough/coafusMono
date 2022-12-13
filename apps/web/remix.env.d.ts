/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />
/// <reference types="@emotion/react/types/css-prop" />

import type { Response } from 'express';
import type { Payload, User } from '@org/cms';

declare module '@remix-run/node' {
    interface AppLoadContext {
        payload: Payload;
        user: {
            user?: User;
            token?: string;
            exp?: number;
        };
        res: Response;
    }
}
