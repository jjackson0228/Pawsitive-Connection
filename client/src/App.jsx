import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import HeaderComponent from "./components/Header";
import Footer from "./components/Footer";

// import stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Elements stripe={stripePromise}>
      <ApolloProvider client={client}>
        <HeaderComponent />
        {/* <div className="main-content"></div> */}
        <Outlet />
        <Footer />
      </ApolloProvider>
    </Elements>
  );
}

export default App;
