import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ApolloClient,ApolloProvider, InMemoryCache} from "@apollo/client";
const cache = new InMemoryCache(
  {
  typePolicies:{
    Mutation:{
      fields:{
        createUser(existingData,{args,toReference}){
          console.log({...existingData})
          
          // const newData = toReference({...args.user})
          return []
        },
        read(args){
          console.log(args);
        }
        
      }
    }
  }
}
)


const client = new ApolloClient({
  cache: new InMemoryCache({}),    
  uri:"http://localhost:3001/graphql",
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
