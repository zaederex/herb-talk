const initialState = {
    strainSearchName: '',
    strainList: []
};

const actions = {
    'SEARCH_STRAIN_NAME': searchStrainName,
    'SET_STRAIN_LIST': setStrainList,
}

function searchStrainName(state, action) {
    return {
        ...state,
        strainSearchName: action.payload.searchName
    }
}

function setStrainList(state, action) {
    return {
        ...state,
        strainList: action.payload.strainList,
    }
}

export default { initialState, actions }