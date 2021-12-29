import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import user from './ducks/userDuck';
import location from './ducks/locationDuck';
import spinner from './ducks/spinnerDuck';
import session from "./ducks/sessionDuck"

const rootReducer = combineReducers({
    user,
    location,
    spinner,
    session,
});

var Singleton = (() => {
    var instance;

    function createInstance() {
        return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default Singleton.getInstance();