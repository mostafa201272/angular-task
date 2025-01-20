/**
 * [+] AUTHOR: MOSTAFA MAHMOUD EL-SHERBINIY
 * [+] DESCRIPTION:
 *          MODULES ROUTERS CONFIG. FILE THAT HOLDS ALL APPLICATION ROUTES
 *          THAT COULD BE REPLACED IN FUTURE WITHOUT CRACKING THE APP
 *
 * [+] SETUP:
 *      1. MAKE AN OBJECT WITH MODULE KEY FOR THE WHOLE MODULE (ROUTERS CONTAINER)
 *      2. SET A NAME AND ROUTE FOR THE WHOLE MODULE (BASE ROUTER)
 *         EX:
 *            module: {
 *              name: 'module-name',
 *              route: '/module-base-router',
 *              label: 'module-label',
 *            },
 *
 *      3. TO CREATE A SUB-ROUTERS MAKE AN OBJECT WITH THE SUB-ROUTER KEY FOR THE SUB-ROUTER
 *         THEN SET A NAME AND ROUTE.
 *         EX:
 *            module: {
 *              name: 'module-name',
 *              route: '/module-base-router',
 *              label: 'module-label-name',,
 *
 *              subModule: {
 *                name: 'sub-module-name',
 *                label: 'sub-module-label-name',
 *                route: '/module-base-router/sub-module-router',
 *
 *              },
 *            },
 *
 * [+] NOTE:
 *    (KEY) NAME  => USED WHEN YOU WANT TO SET THE PATH IN THE ROUTING MODULE
 *    (KEY) ROUTE => USED WHEN YOU WANT TO SET A ROUTER-LINK IN MENU FOR NAVIGATION PURPOSE
 *
 */

export const MODULES_ROUTES = {
  auth: {
    name: 'auth',
    route: '/auth',
    label: 'auth',

    login: {
      name: 'login',
      route: '/auth/login',
      label: 'login',
    },
    registration: {
      name: 'registration',
      route: '/auth/registration',
      label: 'registration',
    },
  },
  home: {
    name: 'home',
    route: '/home',
    label: 'home',
  },
  visitors: {
    name: 'visitors',
    route: '/visitors',
    label: 'visitors',
  },
};
