export default (actionMappings, initialState) => {
    return (state = initialState, action) => {
        if (!actionMappings[action.type]) {
            return state;
        }

        return actionMappings[action.type](state, action.payload);
    };
};
