import {createCookieSessionStorage} from 'react-router';

/**
 * Custom session implementation for Numa Skin Hydrogen Storefront
 */
export class AppSession {
  isPending = false;
  #sessionStorage: any;
  #session: any;

  constructor(sessionStorage: any, session: any) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'numaskin_session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage
      .getSession(request.headers.get('Cookie'))
      .catch(() => storage.getSession());

    return new this(storage, session);
  }

  get has() {
    return this.#session.has.bind(this.#session);
  }

  get get() {
    return this.#session.get.bind(this.#session);
  }

  get flash() {
    return this.#session.flash.bind(this.#session);
  }

  unset(key: string) {
    this.isPending = true;
    return this.#session.unset(key);
  }

  set(key: string, value: any) {
    this.isPending = true;
    return this.#session.set(key, value);
  }

  destroy() {
    return this.#sessionStorage.destroySession(this.#session);
  }

  commit() {
    this.isPending = false;
    return this.#sessionStorage.commitSession(this.#session);
  }
}
