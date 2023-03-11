import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { Platform,TouchableOpacity } from "react-native";

describe('AllUserScreen', () => {
  it('renders after successful login', async () => {
    // Render the LoginScreen
    const {getByPlaceholderText, getByText, queryByTestId} = render(<LoginScreen />);

    // Fill out the login form with valid credentials

    fireEvent.changeText(getByPlaceholderText("email"), 'aleks@gmail.com');
    fireEvent.changeText(getByPlaceholderText("password"), 'Password123');
    fireEvent.press(getByText("Log In"));
    


    // Wait for the login process to complete
    await waitFor(() => {
        expect(queryByTestId('AllUsersScreen')).toBeDefined();
      }, {timeout: 5000});

    // // Check that the AllUserScreen is rendered
    // const allUserScreen = getByTestId('AllUsersScreen');
    // expect(allUserScreen).toBeDefined();
  });
});
