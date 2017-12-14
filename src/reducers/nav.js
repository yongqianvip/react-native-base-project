import {AppNavigator} from '../constant/routers.js'


const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('WelcomeScreen'));
console.log("--- initialState ",initialState);

export default navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};
