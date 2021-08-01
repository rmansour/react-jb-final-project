const initialState = {
    vacations: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case 'updateVacations':
            state = {...state, vacations: [...payload]};
            break;
        default:
            return state;
    }
    return state;
}
