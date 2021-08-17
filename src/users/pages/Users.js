import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Max',
      image:
        'https://i.picsum.photos/id/1021/2048/1206.jpg?hmac=fqT2NWHx783Pily1V_39ug_GFH1A4GlbmOMu8NWB3Ts',
      places: 2
    },
    {
      id: 'u2',
      name: 'Schwarz',
      image:
        'https://i.picsum.photos/id/1024/1920/1280.jpg?hmac=-PIpG7j_fRwN8Qtfnsc3M8-kC3yb0XYOBfVzlPSuVII',
      places: 3
    }
  ];

  return <UsersList users={USERS} />;
};

export default Users;
