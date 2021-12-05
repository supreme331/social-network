import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hello world!', likesCount: '12'},
                {id: 2, message: 'First post', likesCount: '18'}
            ],
            newPostText: ''
        },
        messagesPage: {
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
            ],
            newMessageText: ''
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
                this._callSubscriber(this._state);

    }
}




window.store = store;
export default store;