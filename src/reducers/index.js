import { combineReducers } from 'redux';
import foo from './foo.js'
import bar from './bar.js'
import nav from './nav.js'
import pmArticle from './pmarticle.js'
import location from './location.js'
import weather from './weather.js'

const rootReducer = combineReducers({
  foo,
  bar,
  nav,
  pmArticle,
  location,
  weather
})

export default rootReducer;