import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloProvider,ApolloClient,InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          user(name){
            return name.toUpperCase();
          }
        },
          /* broadcast: false // Include this to prevent automatic query refresh */

      }
    }
  }),
  uri:"http://localhost:3001/graphql",
})

const root = ReactDOM.createRoot(document.getElementById('root'));
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
