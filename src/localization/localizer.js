import { store } from '../redux/configureStore'

export default localize = (word) => {
    let lang = store.getState().auth.Language;
    if (!lang || lang === 'eng'){
        const arabicDictionary = require('./english').default;
        return arabicDictionary[word]
    }else{
        const arabicDictionary = require('./arabic').default;
        return arabicDictionary[word]
    }
     
}