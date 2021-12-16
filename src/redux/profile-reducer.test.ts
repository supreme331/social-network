import profileReducer, {actions} from "./profile-reducer"

let state = {
    posts: [
        {id: 1, message: 'First post', likesCount: 12},
        {id: 2, message: 'Hello world!', likesCount: 18}
    ],
    profile: null,
    status: ''
}

test('length of posts should be incremented', () => {
    // 1. test data
    let action = actions.addPostAC("test text")

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(3)
})

test('message of new posts should be correct', () => {
    // 1. test data
    let action = actions.addPostAC("test text")

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts[2].message).toBe("test text")
})

test('after deleting length should be decrement', () => {
    // 1. test data
    let action = actions.deletePostAC(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(1)
})

