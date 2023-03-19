import React from 'react';
import { render, fireEvent,prettyDOM,screen,debug  } from '@testing-library/react-native';
import AllUsersScreen from '../screens/AllUsersScreen';
import { getAuth } from 'firebase/auth';
import { collection, getDoc,updateDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';
import {getUser} from '../utils/getUser';

// Mock the firebase functions
jest.mock('firebase/auth');
jest.mock('firebase/firestore/lite');

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


jest.mock('../utils/getUser', () => ({
  getUser: jest.fn().mockReturnValue({
    email: 'test@example.com',
    name: 'Test User',
  }),
}));


describe('AllUsersScreen', () => {
  test('user email should be displayed', () => {
    const currentUser = { email: 'aleks@gmail.com' };
    const randomUser = {email: "alex@gmail.com"};
    getAuth.mockReturnValue({ currentUser }); //this mocks the return values of the getAuth function into the currentUser variable
    const { getByText, } = render(<AllUsersScreen />);
    expect(getByText(`hello ${currentUser.email}`)).toBeDefined();
    expect(getByText(`Add Friend`)).toBeDefined();
  });

 

  // test("render flatlist",()=> {
  //   const currentUser = { email: 'aleks@gmail.com' };
  //   getAuth.mockReturnValue({ currentUser });
  //   const { getByTestId,container,queryAllByTestId } = render(<AllUsersScreen />);
  //   const flatListChildren = queryAllByTestId('emailbutton');
  //   expect(flatListChildren.length).toBeGreaterThan(1);
  //   expect(getByTestId(`flatlist`)).toBeDefined();

  // });
});
  
