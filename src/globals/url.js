// /**
//  * External dependencies
//  */
// import { parse, stringify } from 'qs';


// /**
//  * Appends arguments to the query string of the url
//  *
//  * @param  {string}	url   URL
//  * @param  {Object}	args  Query Args
//  *
//  * @return {string}       Updated URL
//  */
// export function addQueryArgs (url, args) {
//   // preview
//   if (args && args.preview) {
//     return goTo(url);
//   }

//   // edit
//   if (args && args.post && args.action) {
//     const path = window.location.pathname.split('/');
//     resetPath(path[ 1 ]);

//     if (path[ 2 ] === 'new') {
//       return goTo(`${args.post}/${args.action}`);
//     }
//     return goTo(`${path[ 2 ]}/${path[ 3 ]}`);
//   }

//   // new
//   if (args && args.trashed) {
//     resetPath(`${args.post_type}s`);

//     return goTo('new');
//   }

//   // original
//   const queryStringIndex = url.indexOf('?');
//   const query = queryStringIndex !== -1 ? parse(url.substr(queryStringIndex + 1)) : {};
//   const baseUrl = queryStringIndex !== -1 ? url.substr(0, queryStringIndex) : url;

//   return baseUrl + '?' + stringify({ ...query, ...args });
// }

// /**
//  * [resetPath description]
//  * @param  {string} pathname [description]
//  */
// function resetPath (pathname) {
//   window.history.replaceState(
//     { },
//     ' ',
//     `${window.wpApiSettings.root}/${pathname}/`,
//   );
// }

// /**
//  * [goTo description]
//  * @param  {[type]} path [description]
//  * @return {[type]}      [description]
//  */
// function goTo (path) {
//   // console.log( path );
//   return path;
// }
