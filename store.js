import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import ExcelImporter from "./api/ExcelImporter";
import cellNames from "./data/productsCellNames";
import RoutesHelper from "./data/routesHelper";

const initialState = {
    products: [],
    categories: [],
}

export const actionTypes = {
    LoadLocalData: 'LoadLocalData',
    GetAllData: 'GetAllData',
}

// REDUCERS
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GetAllData:
            return action.payload;
            break;
        default: return state
    }
}

// ACTIONS
export const getProducts = (isServer) => dispatch => {
    if (isServer) {
        let products = ExcelImporter.LoadData();
        if (products){
            const categories = ExcelImporter.getCategories(products);
            let payload = { products, categories }
            RoutesHelper.SaveRoutes("./data/routes.json");
            return dispatch({ type: actionTypes.GetAllData, payload })
        }

    }
    else
        return dispatch({ type: actionTypes.LoadLocalData })

}

export const initStore = (initialState = initialState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}