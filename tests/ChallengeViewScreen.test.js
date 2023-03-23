import React from 'react'
import { render, screen, fireEvent, renderHook,queryAllByType,waitFor, } from '@testing-library/react-native';
import 'react-native-gesture-handler/jestSetup';

import ChallengesViewScreen from '../screens/ChallengesViewScreen';
jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
      }),
    };
});


// =====================================================================
const sampleData = [{challenge:"Make 2 friends",goal:7,type:"friendChallenge",id:"challenge1"}];
const sampleUser = [{email:"ridwan@gmail.com", friendsList:["e@gmail.com","d@gmail.com"]}]

describe("ChallengesViewScreen", () => {
    it("renders correctly", () => {
      const { getByText } = render(<ChallengesViewScreen />);
      expect(getByText("These are your challenges")).toBeDefined();
    });

    /* it("when ", () => {
      fireEvent.press(getByText('Add the item to list'));
    }); */
  
    it("renders the challenges list correctly", async () => {
      render(<ChallengesViewScreen challenges={sampleData} profile={sampleUser}/>);
      const flatList = screen.getByTestId("flat-list");
  
      expect(flatList).toBeTruthy();
  
      await waitFor(() => {
        const challengeTexts = ["Challenge 1", "Challenge 2", "Challenge 3"];
        challengeTexts.forEach((text) => {
          expect(queryByText(text)).toBeTruthy();
        });
      });
    });
    it("navigates to the Leaderboard screen when 'View Friends Progress' is pressed", async () => {
        const mockNavigation = { navigate: jest.fn() };
        render(<ChallengesViewScreen navigation={mockNavigation} />);
        const viewFriendsButton = screen.getByTestId("View Friends Progress");
    
        fireEvent.press(viewFriendsButton);
    
        await waitFor(() => {
          expect(mockNavigation.navigate).toHaveBeenCalledWith("Leaderboard", {
            challengeInfo: `{"type":"challenge_type","challenge": "challenge_name"}`,
          });
        });
      });
    
      it("redeems the medal when 'Redeem Medal' is pressed", async () => {
        // Set up the mock functions and render the component
        const mockUpdateDoc = jest.fn(() => Promise.resolve());
        jest.mock("firebase/firestore/lite", () => ({
          ...jest.requireActual("firebase/firestore/lite"),
          updateDoc: mockUpdateDoc,
        }));
        render(<ChallengesViewScreen challenges={sampleData} profile={sampleUser}/>);
        const redeemButton = screen.getByTestId("Redeem Medal");
    
        // Press the Redeem Medal button and wait for the updateDoc call to finish
        fireEvent.press(redeemButton);
    
        await waitFor(() => {
          expect(mockUpdateDoc).toHaveBeenCalled();
        });
      });
    });    
    
    
    
    
    