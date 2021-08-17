import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

import './UserList.css';

const UserList = ({ users }) => {
  if (users?.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className='users-list'>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
};

export default UserList;
