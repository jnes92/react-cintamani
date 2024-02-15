import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import ExcelImporter from "./api/ExcelImporter";
import RoutesHelper from "./data/routesHelper";
import FileManager from './api/FileManager';

export const initialState = {
    products: [],
    categories: [],
}

export const actionTypes = {
    LoadLocalData: 'LoadLocalData',
    GetAllData: 'GetAllData',
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GetAllData:
            return action.payload;
            break;

        default: return state
    }
}

export const getProducts = (isServer) => dispatch => {
    if (isServer) {
        let products = ExcelImporter.LoadData();
        if (products){
            const categories = ExcelImporter.getCategories(products);
            let staticTexts = FileManager.ImportStaticTextFiles();
            let payload = { products, categories, staticTexts }
            RoutesHelper.SaveRoutes("./data/routes.json");
            return dispatch({ type: actionTypes.GetAllData, payload })
        }

    }
    else
        return dispatch({ type: actionTypes.LoadLocalData })

}

export const initStore = (initialState = {    products: [],
    categories: []}) => {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}