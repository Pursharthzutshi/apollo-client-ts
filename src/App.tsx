
// export {}
import { useEffect, useState } from "react";
import DisplayData from "./DisplayData";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import "./App.css";
import { createUserMutation, deleteUserMutation, getUserByName, updateUsernameMutation } from "./Mutation";
import AddUserForm from "./addUserForm";
import  { createUserPostType}  from "./types/formInterface";
function App() {
  

  

  // const formPrevent() {
  // }
  

  const [movieSearch, setMovieSearched] = useState<String>("");

  //delete

  const [deleteId, setDeleteId] = useState<String>("");
  //create post states

  const [uid, setUid] = useState<String>("");
  const [newUsername, setNewUsername] = useState<String>("");

  const { data, loading, error, refetch, Query_all_Users } = DisplayData();

  const [fetchUserDataByName, { data: FindUserByName }] =
    useLazyQuery(getUserByName);

  const [
    deleteUserPost,
    {
      data: deleteUserPostData,
      loading: deleteUserLoading,
      error: deleteUserError,
    },
  ] = useMutation(deleteUserMutation, {
    onCompleted: (data) => {
      console.log("User deleted:", data);
    },
    onError: (error) => {
      console.log(error);
    },

    // refetchQueries:[{query:Query_all_Users}]
  });

  const [updateUserPost, { data: UpdatedData }] = useMutation(
    updateUsernameMutation,
    {
      onCompleted: (data) => {
        console.log("User deleted:", data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  


  if (loading) return <div>spinner</div>;
  
  return (
    <div className="App">
      
<AddUserForm/>
      <input
        className="delete-input"
        type="text"
        placeholder="select delete id"
        onChange={(e) => {
          setDeleteId(e.target.value);
        }}
      />
      <button
        className="delete-button"
        onClick={async () => {
          await deleteUserPost({
            variables: {
              uid: deleteId,
            },
          });
        }}
      >
        Delete
      </button>


      {data.UserList.map((val:createUserPostType) => {
        return (
          <div>
            <h3>ID</h3>
            <p>{val.uid}</p>
            <p>{val.name}</p>
            <p>{val.age}</p>
            <p>{val.username}</p>
          </div>
        );
      })}

      <input
        type="text"
        placeholder="user name"
        onChange={(e) => {
          setMovieSearched(e.target.value);
        }}
      />

      <button
        onClick={() => {
          fetchUserDataByName({
            variables: {
              name: movieSearch,
            },
          });
        }}
      >
        Fetch Data By Name
      </button>

      <div>
        <h4>Create New Post</h4>

        <form className="add-post-form" >
          <input
            placeholder="select update id"
            type="text"
            onChange={(e) => {
              setUid(e.target.value);
            }}
          />

          <input
            placeholder="Update Name"
            type="text"
            onChange={(e) => {
              setNewUsername(e.target.value);
            }}
          />

          <button
            className="update-button"
            onClick={() => {
              updateUserPost({
                variables: {
                  updateUsername: { uid, newUsername },
                },
              });
            }}
          >
            Update user post
          </button>
        </form>


        {FindUserByName && <p>{FindUserByName.user.name}</p>}
      </div>
    </div>
  );
}

export default App;
