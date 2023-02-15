// import React from 'react'
// import { render, screen, fireEvent, renderHook } from '@testing-library/react-native';
// import 'react-native-gesture-handler/jestSetup';
// import { mockDatabase } from 'firebase-mock';

// import FriendRequestScreen from '../screens/FriendRequestsScreen';
// const mockData = {
//     'users':{
//         'user1':{
//             age: 10,
//             email:"JohnDoe@gmail.com",
//             friendRequests:[],
//             friends:[],
//             gender:'male',
//             height: 2,
//             name: "John",
//             weight: 85
//         },
//         'user2':{
//             age: 11,
//             email:"JaneDoe@gmail.com",
//             friendRequests:[],
//             friends:[],
//             gender:'female',
//             height: 1.8,
//             name: "jane",
//             weight: 50
//         }
//     }
// }

// const validP = "ValidPassword123#";
// const validE = "valid@example.com";

// it('Test client-side validators', () => {
//     const { getByPlaceholderText, getByText, getByTestId } = render(<LogInScreen />);
//     let invalidE = getByTestId("invalidEmail")
//     let invalidP = getByTestId("invalidPassword")

//     // before running validators, no errors
//     expect(invalidE.children.length).toBe(0);
//     expect(invalidP.children.length).toBe(0);

//     // send invalid values
//     fireEvent.changeText(getByPlaceholderText("email"), "invalid")
//     fireEvent.changeText(getByPlaceholderText("password"), "inv")
//     // run validators
//     fireEvent.press(getByText("Log In"))

//     // review elements, expecting errors
//     invalidE = getByTestId("invalidEmail")
//     invalidP = getByTestId("invalidPassword")
//     expect(invalidE.children.length).toBe(1);
//     expect(invalidP.children.length).toBe(1);

//     // send valid values
//     fireEvent.changeText(getByPlaceholderText("email"), validE)
//     fireEvent.changeText(getByPlaceholderText("password"), validP)
//     fireEvent.press(getByText("Log In"))

//     // check errors hide
//     invalidE = getByTestId("invalidEmail")
//     invalidP = getByTestId("invalidPassword")
//     expect(invalidE.children.length).toBe(0);
//     expect(invalidP.children.length).toBe(0);
// });