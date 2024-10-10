import { createReducer, on } from '@ngrx/store';
import { myRestaurantsState} from './myRestaurants.state';
import { myRestaurantsActions } from './myRestaurants.actions';

export const myRestaurantsReducer = createReducer(
    myRestaurantsState,
    on( myRestaurantsActions.getMyRestaurants, (state, action) => ({
        ...state,
        myRestaurants:[],
        loading: true,
        error: '',
    })),
    on( myRestaurantsActions.getMyRestaurantsSuccess, (state, action) => ({
        ...state,
        myRestaurants: action.myRestaurants,
        loading: false,
        error: '',
    })),
    on( myRestaurantsActions.getMyRestaurantsFailure, (state, action) => ({
        ...state,
        myRestaurants: [],
        loading: false,
        error: action.error,
    }))
    
);
