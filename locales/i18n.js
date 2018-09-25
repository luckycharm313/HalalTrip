import I18n from 'react-native-i18n';
// Import all locales
import en from './en.json';
import th from './th.json';
import ms from './ms.json';


// async function getLang(){
//   const data = await SyncStorage.init();
//   console.log('AsyncStorage is ready!', data);
//   const lang = SyncStorage.get('language');
//   console.log("lang => ", lang)
// }

// if(lang){
//   I18n.locale = lang
// }
// else{
//   I18n.locale = "th"
// }
I18n.reduxStore = {}

I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  th,
  ms
};


const currentLocale = I18n.currentLocale();

console.log("currentLocale => ", currentLocale)

// // Is it a RTL language?
// export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export  function strings(name, params = null) {  
  const _langIndex = I18n.reduxStore.getState && I18n.reduxStore.getState().main.lang
  let lang = "th";
  switch(_langIndex){
    case 0:
      lang = "th";
      break;
    case 1:
      lang = "en";
      break;
    case 2:
      lang = "ms";
      break;
  }
  I18n.locale = lang
  return I18n.t(name);
};

export default I18n;