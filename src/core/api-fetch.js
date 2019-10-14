
import apiFetch from '../globals/api-fetch';

const {
  use,
  createNonceMiddleware,
  createRootURLMiddleware,
  setFetchHandler,
} = window.wp.apiFetch;

const nonceMiddleware = createNonceMiddleware(window.wpApiSettings.nonce);

use(nonceMiddleware);

window.wp.hooks.addAction(
  'heartbeat.tick',
  'core/api-fetch/create-nonce-middleware',
  function (response) {
    if (response.rest_nonce) {
      nonceMiddleware.nonce = response.rest_nonce;
    }
  }
);

use(createRootURLMiddleware(window.wpApiSettings.root));

setFetchHandler(apiFetch);
