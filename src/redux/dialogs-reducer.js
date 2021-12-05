const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Petr'},
        {id: 2, name: 'Anton'},
        {id: 3, name: 'Alex'},
        {id: 4, name: 'Gleb'},
        {id: 5, name: 'Artur'}
    ],
    messages: [
        {id: 1, message: 'Hi there'},
        {id: 2, message: 'HAHAHA'},
        {id: 3, message: 'Trololo'}
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
}

export const sendMessageAC = (newMessageText) => ({type: SEND_MESSAGE, newMessageText})


export default dialogsReducer;