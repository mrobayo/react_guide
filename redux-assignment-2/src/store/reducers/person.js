import * as actionTypes from '../actions';

const initialState = {
    personList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            const newPerson = {
                ...action.person
            }
            return {    
                ...state,
                personList: state.personList.concat(newPerson)
            }
        case actionTypes.DELETE_PERSON:
            const updatedList = state.personList.filter(person => (person.id !== action.personId));
            return {
                ...state,
                personList: updatedList
            }
    }
    return state;
}

export default reducer;