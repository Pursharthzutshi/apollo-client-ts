import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

const getUserByName = gql`
    query User($name: String) {
      user(name: $name) {
        name
      }
    }
  `;

  //create user mutation

  const createUserMutation = gql`
    mutation CreateUser($user: userInputType!) {
      createUser(user: $user) {
        uid
        name
      }
    }
  `;
  const deleteUserMutation = gql`
    mutation DeleteUser($uid: ID!) {
      deleteUser(uid: $uid) {
        uid
      }
    }
  `;

  const updateUsernameMutation = gql`
    mutation updateUsername($updateUsername: updateUsernameType) {
      updateUsername(updateUsername: $updateUsername) {
        uid
        username
      }
    }
  `;


export {getUserByName,createUserMutation,deleteUserMutation,updateUsernameMutation};