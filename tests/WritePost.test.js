import React from 'react'
import { render, waitFor, screen, fireEvent, renderHook, act } from '@testing-library/react-native';

import FoodBasketScreen from '../screens/FoodBasketScreen';
import { DeviceEventEmitter } from 'react-native';
import { createPost } from '../utils/addPost';
import { getAuth } from 'firebase/auth'

import WritePost from "../screens/WritePost"

jest.mock("../utils/addPost");
jest.mock("firebase/auth");

createPost.mockReturnValue(true);
getAuth.mockReturnValue(JSON.parse(
    `{"currentUser":{"email": "sa@gmail.com"}}`
))
let dateString = (new Date(Date.now())).toDateString();

JSON.parse = jest.fn().mockImplementationOnce(() => {
    `{
        "date": "${dateString}",
        "email": "sa@gmail.com",
        "communityId": "lose weight",
        "content": "content",
        "title": "title",
        "likes": "0"
      }`
});
  

// credit https://spin.atomicobject.com/2021/02/24/react-navigation-5-unit-testing-components/
// Workaround to prevent the render function from throwing an exception, as components depend on having a 
// navigation prop in order to make use of the useNavigation() function
// =====================================================================
jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        pop: jest.fn(),
      }),
    };
});
// =====================================================================
afterEach(()=>{
    jest.clearAllMocks();
})

it("test writePost calls createPost correctly", async () => {
    
    let route={
        params:{
            communityId: "lose weight"
        },
    }
    let myRender = render(<WritePost route={route}/>)

    fireEvent.changeText(myRender.getByTestId("titleInput"), "title")
    fireEvent.changeText(myRender.getByTestId("contentInput"), "content")

    // Difficult to test because TouchableOpacity doesn't work with test-renderer


    // let myObj = 
    //   `{
    //     "date": "${dateString}",
    //     "email": "sa@gmail.com",
    //     "communityId": "lose weight",
    //     "content": "content",
    //     "title": "title",
    //     "likes": "0"
    //   }`
    
      let button=myRender.getByTestId("saveButton")

    await waitFor(()=>{
        expect(button).toBeTruthy()
    })
    await Promise.resolve();
    await act(async () => {fireEvent.press(button)})

    await Promise.resolve();
    expect(createPost).toBeCalledTimes(1);
    // expect(createPost).toBeCalledWith(saveObject)

})

