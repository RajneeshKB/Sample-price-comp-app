import { initDataMaker } from '../helpers/pc-helper';
export const updateRowData = () => async (dispatch, data) =>{
    // let response = await pcApis.post('/get-data', requestObj);
    // const otaData = initDataMaker();
    // dispatch({ type: 'UPDATE_ROWDATA', payload: otaData });
    let pcData = initDataMaker();
    return {
        type: 'UPDATE_ROWDATA',
        payload: [...pcData ]
    }
}

export const updateColData = data => {
    return {
        type: 'UPDATE_COLDATA',
        payload: [ ...data]
    }
}

