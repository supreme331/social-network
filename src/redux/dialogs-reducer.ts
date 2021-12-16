import {DialogType, MessageType} from "../types/types"
import {InferActionsTypes} from "./redux-store"

let initialState = {
    dialogs: [
        {id: 1, name: 'Petr'},
        {id: 2, name: 'Anton'},
        {id: 3, name: 'Alex'},
        {id: 4, name: 'Gleb'},
        {id: 5, name: 'Artur'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi there'},
        {id: 2, message: 'HAHAHA'},
        {id: 3, message: 'Trololo'}
    ] as Array<MessageType>
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            let newMessage = {
                id: 4,
                message: action.newMessageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageText: string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', newMessageText} as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
