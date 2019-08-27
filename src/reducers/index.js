import { combineReducers } from 'redux';
import { formatColData, getDefaultColData } from '../helpers/pc-helper';

const rowDataReducer = (rowData=[],action) =>{
    switch(action.type){
        case 'UPDATE_ROWDATA':
            return action.payload;
        default: 
            return rowData;
    }
}

const colDataReducer = (colData = [], action) => {
    switch (action.type) {
        case 'UPDATE_COLDATA':
            if (action.payload && action.payload.length) return formatColData(action.payload);
            else return formatColData(getDefaultColData());
        default:
            return colData;
    }
}


export default combineReducers({ 
    rowData: rowDataReducer,
    colData: colDataReducer
});