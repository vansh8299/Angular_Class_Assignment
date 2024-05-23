import { AppInterface } from './appinterface';

export const AppDetailarr: AppInterface[] = [
  {
    id: 1,
    imageurl: 'https://via.placeholder.com/150/1e90ff/FFFFFF/?text=Dummy+App+1',

    user_id: 'user1',
    app_name: 'Dummy App 1',
    description: 'This is a dummy app for testing purposes.',
    release_date: new Date('2024-05-01'),
    version: 1,
    genre: 'Health',
    visibility: true,
    downloadCount: 100,
    comments: [
      {
        user_id: 'user2',
        application_id: 'app1',
        statement: 'Great app! Very useful.',
        rating: 4.5,
      },
      {
        user_id: 'user3',
        application_id: 'app1',
        statement: 'Could be improved.',
        rating: 3,
      },
    ],
    averageRating: 3.75,
  },
  {
    id: 2,
    imageurl: 'https://via.placeholder.com/150/ff6347/FFFFFF/?text=Dummy+App+2',
    user_id: 'user2',
    app_name: 'Dummy App 2',
    description: 'Another dummy app for testing purposes.',
    release_date: new Date('2024-05-10'),
    version: 1,
    genre: 'Game',
    visibility: true,
    downloadCount: 50,
    comments: [
      {
        user_id: 'user1',
        application_id: 'app2',
        statement: 'Fun game!',
        rating: 4,
      },
    ],
    averageRating: 4,
  },
];
