// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rickAngMortyApi: 'https://rickandmortyapi.com/api/character',
  signUpApi: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
  loginInApi:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
  authApiKey:  "AIzaSyDGIh0qBLuSDK0WfDyGl8kdcuplDQaW3n4",
  chatApi: 'https://angular-ionic-rick-and-morty.firebaseio.com/messages.json',
  firebaseConfig : {
    apiKey: "AIzaSyDGIh0qBLuSDK0WfDyGl8kdcuplDQaW3n4",
    authDomain: "angular-ionic-rick-and-morty.firebaseapp.com",
    databaseURL: "https://angular-ionic-rick-and-morty.firebaseio.com",
    projectId: "angular-ionic-rick-and-morty",
    storageBucket: "angular-ionic-rick-and-morty.appspot.com",
    messagingSenderId: "589222524143",
    appId: "1:589222524143:web:d42e009797ca5616d6d71a",
    measurementId: "G-6EE3LD25PM"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
