import {DialogType, MessageType} from "../types/types"
import {InferActionsTypes} from "./redux-store"

let initialState = {
    dialogs: [
        {id: 1, name: 'Petr A.',
            messages: [
                {id: 1, message: 'Hello Petr'},
                {id: 2, message: 'Petr2'},
                {id: 3, message: 'Petr3'}
            ] as Array<MessageType>},
        {id: 2, name: 'Anton B.',
            messages: [
                {id: 1, message: 'Hello Anton'},
                {id: 2, message: 'Anton2'},
                {id: 3, message: 'Anton3'}
            ] as Array<MessageType>},
        {id: 3, name: 'Alex C.',
            messages: [
                {id: 1, message: 'Hello Alex'},
                {id: 2, message: 'Alex2'},
                {id: 3, message: 'Alex3'}
            ] as Array<MessageType>},
        {id: 4, name: 'Gleb D.',
            messages: [
                {id: 1, message: 'Hello Gleb'},
                {id: 2, message: 'Gleb2'},
                {id: 3, message: 'Gleb3'}
            ] as Array<MessageType>},
        {id: 5, name: 'Artur E.',
            messages: [
                {id: 1, message: 'Hello Artur'},
                {id: 2, message: 'Artur2'},
                {id: 3, message: 'Artur3'}
            ] as Array<MessageType>}
    ] as Array<DialogType>

}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            let newMessage = {
                id: 4,
                message: action.newMessageText
            }
            let dialog = state.dialogs.find(d => d.id === action.dialogId)
            let dialogIndex = state.dialogs.findIndex(d => d.id === action.dialogId)
            if (dialog) {
                let changedDialog = {...dialog, messages: [...dialog.messages, newMessage]}
                let dialogsCopy = state.dialogs.slice()
                dialogsCopy.splice(dialogIndex,1, changedDialog)
                return {
                    ...state,
                    dialogs: dialogsCopy
                }
            } else {
                return state
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (dialogId: number, newMessageText: string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', dialogId, newMessageText} as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
