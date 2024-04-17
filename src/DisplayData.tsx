import React, { useEffect } from "react";
import {useQuery,useLazyQuery,gql} from "@apollo/client"

const Query_all_Users = gql`
query queryName{
    UserList{
    uid
    name
    username
    age
}
}
`

function DisplayData(){
    const {data,loading,error,refetch} = useQuery(Query_all_Users,{
        onCompleted: (data) => {
            console.log('User deleted:', data);
            // Optionally refetch data here
          },
              onError:(error)=>{
            console.log(error);
          } 
    });

    return{
        data,
        loading,
        error,
        refetch,
        Query_all_Users
    }
}

export  default DisplayData