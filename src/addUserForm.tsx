import React, { useEffect, useState } from "react";
// import { createUserMutationType,  createUserPostType } from "./types/formInterface";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { createUserMutation } from "./Mutation";


function AddUserForm(){
  
  const formPrevent = (e:any) =>{
    e.preventDefault();
    console.log(e)
  }

  const [name, setName] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [age, setAge] = useState<Number>(0);
  const [nationality, setNationality] = useState<String>("");
  
  const [createUserPost, { loading: createUserPostLoading }] = useMutation(
    createUserMutation,
    {
      // update(cache, { data: { das } }) {
      //   let fakedata = {
      //     uid: "1",
      //     name: "jimmy",
      //     username: "JM",
      //     age: 26,
      //     nationality: "USA",
      //   };
      //   cache.writeQuery({
      //     query: Query_all_Users,
      //     data: {
      //       UserList: [{...fakedata}],
      //     },
      //   });
      //   const data = cache.readQuery({ query: Query_all_Users });
      //   console.log(data);
      // },
      // refetchQueries: [{ query: Query_all_Users }],

      onCompleted: (data) => {
        // refetch()
        console.log("User deleted:", data);
        // Optionally refetch data here
      },
      //     onError:(error)=>{
      //   console.log(error);
      // },

      // refetchQueries: [{ query: Query_all_Users }],
    }
  );
  const handleAddUserPost = () => {
    createUserPost({
        variables: {
          user: {
            uid: uuidv4(),
            name,
            username,
            age: Number(age),
            nationality,
          },
        },
      });
};

return(
<form onSubmit={formPrevent} className="add-post-form" >
<input
  placeholder="Name"
  type="text"
  onChange={(e) => {
    setName(e.target.value);
  }}
/>
<input
  placeholder="Username"
  type="text"
  onChange={(e) => {
    setUsername(e.target.value);
  }}
/>
<input
  placeholder="Age"
  type="number"
  onChange={(e) => {
    setAge(Number(e.target.value));
  }}
/>
<input
  placeholder="Nationality"
  type="text"
  onChange={(e) => {
    setNationality(e.target.value.toUpperCase());
  }}
/>

<button className="add-button" onClick={handleAddUserPost} >Add user post</button>
</form>

)
}

export default AddUserForm