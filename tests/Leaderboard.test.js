import React from 'react';
import { render } from '@testing-library/react-native';
import Leaderboard, { sortByChallengeType } from '../screens/Leaderboard';
import { getDoc, getDocs, doc, collection, query, where } from 'firebase/firestore';

// Mocking dependencies
jest.mock('react-native/Libraries/LogBox/Data/LogBoxData'); // To avoid LogBox error in testing

jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
        dispatch: jest.fn(),
        pop: jest.fn(),
      }),
      useRoute: () => ({
    params: {
      challengeInfo: JSON.stringify({ type: 'calorie', challenge: 'Sample Challenge' }),
    },
  }),
    };
});

jest.mock('firebase/auth', () => ({
  getAuth: () => ({
    currentUser: {
      email: 'test@example.com',
    },
  }),
}));

const mockSnapshot = {
  data: () => ({ name: 'CurrentUser', timesCalGoalHit: 7, friends:[""] }),
};

jest.mock('firebase/firestore', () => ({
    collection: jest.fn((collectionName) => ({ name: collectionName })),
    doc: jest.fn((_, documentPath) => ({ path: documentPath })),
    getDoc: jest.fn().mockResolvedValue({ data: () => mockSnapshot.data() }),
    getDocs: jest.fn().mockResolvedValue({ docs: [
        { data: () => ({ name: 'User1', timesCalGoalHit: 5, friends:["test@example.com"] }) },
        { data: () => ({ name: 'User2', timesCalGoalHit: 3, friends:["test@example.com"] }) },
        { data: () => ({ name: 'User3', timesCalGoalHit: 8, friends:["test@example.com"] }) },
    ] }),
    query: jest.fn((collection, query) => ({ collection, query })),
    where: jest.fn((field, operator, value) => ({ field, operator, value })),
}));

// Tests
describe('sortByChallengeType', () => {
    it('should sort by timesCalGoalHit', () => {
      const users = [
        { name: 'User1', timesCalGoalHit: 5 },
        { name: 'User2', timesCalGoalHit: 3 },
        { name: 'User3', timesCalGoalHit: 8 },
      ];
  
      const challengeType = 'calorie';
      const sortedUsers = sortByChallengeType(users, challengeType);
      expect(sortedUsers).toEqual([
        [1, 'User3', 8],
        [2, 'User1', 5],
        [3, 'User2', 3],
      ]);
    });
  
    // Add other tests for the remaining challenge types (recipe and friends)
  });

describe('firebase/firestore mock', () => {
    it('mocks getData correctly', async () => {
        const expectedData = [
            { name: 'User1', timesCalGoalHit: 5, friends:["test@example.com"] },
            { name: 'User2', timesCalGoalHit: 3, friends:["test@example.com"] },
            { name: 'User3', timesCalGoalHit: 8, friends:["test@example.com"] },
          ];
          const userSnapshot = await getDoc(doc(collection('users'), 'test@email.com'));
          const userData = [userSnapshot.data()];

            const allUsersQuery =  query(
                collection('users'),
                where('friends', 'array-contains', 'test@example.com'),
            );

            const allUsersRef = await getDocs(allUsersQuery)
            const allUser = allUsersRef.docs.map(doc => doc.data());
            const users = [...userData,...allUser];
            const challengeType = 'calorie';
            const sortedArr = sortByChallengeType(users,challengeType);
            expect(sortedArr).toEqual(
            [
                [1, 'User3', 8],
                [2, 'CurrentUser', 7],
                [3, 'User1', 5],
                [4, 'User2', 3],
            ]
            );
    });
  });

  describe('Leaderboard component', () => {
    it('renders all elements correctly', async() => {
      const { getByText, getAllByText } = render(<Leaderboard />);
  
      // Check texts
      expect(getByText('This is the leaderboard')).toBeTruthy();
      expect(getByText('Sample Challenge')).toBeTruthy();
  
      // Check table headers
      const headers = getAllByText(/Position|Name|Score/);
      expect(headers).toHaveLength(3);
      expect(headers.map((header) => header.props.children)).toEqual(['Position', 'Name', 'Score']);

      // Check table rows
      const rows = getAllByText(/User1|User1|User3|CurrentUser/).toBeDefined();
      expect(rows).toHaveLength(4);
      expect(rows.map((header) => header.props.children)).toEqual(['User1', 'User2', 'User3', 'CurrentUser']);
  });
});
