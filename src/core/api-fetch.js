
import apiFetch from '../globals/api-fetch';

const {
  use,
  createNonceMiddleware,
  createRootURLMiddleware,
  setFetchHandler,
} = window.wp.apiFetch;

use(createNonceMiddleware(window.wpApiSettings.nonce));
use(createRootURLMiddleware(window.wpApiSettings.root));

setFetchHandler(apiFetch);
