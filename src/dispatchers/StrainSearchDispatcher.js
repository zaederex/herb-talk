export default function StrainSearchDispatcher(dispatch) {
    return {
        searchStrainName: (name) => {
            dispatch({
                type: 'SEARCH_STRAIN_NAME',
                payload: {
                    searchName: name,
                }
            })
        },
        setStrainList: (strainList) => {
            dispatch({
                type: 'SET_STRAIN_LIST',
                payload: {
                    strainList
                }
            })
        }
    }
}