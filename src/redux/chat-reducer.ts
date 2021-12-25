import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid';

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'SN/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => (
        {type: 'SN/CHAT/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => (
        {type: 'SN/CHAT/STATUS_CHANGED', payload: {status}} as const)
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatApi.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}

export default chatReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

type ChatMessageType = ChatMessageAPIType & {id: string}