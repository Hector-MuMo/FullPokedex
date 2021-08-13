import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

const fakeAuthBackend = {
  signIn: (callback) => {
    setTimeout(callback, 1000);
  },
  signOut: (callback) => {
    setTimeout(callback, 1000);
  },
};

const useProvideAuth = () => {
  const [trainer, setTrainer] = useState("");
  const [numPages, setnumPages] = useState(4);

  const signIn = (cb) => {
    fakeAuthBackend.signIn(() => {
      //setTrainer("null");
      cb();
    });
  };

  const signOut = (cb) => {
    fakeAuthBackend.signOut(() => {
      setTrainer(null);
      cb();
    });
  };

  return {
    trainer,
    setTrainer,
    numPages,
    setnumPages,
    signIn,
    signOut,
  };
};

export const DataProvider = ({ children }) => {
  //auth contiene lo que nos regresa el hook (trainer, singIn, singOut
  const auth = useProvideAuth();

  return <DataContext.Provider value={auth}>{children}</DataContext.Provider>;
};

export const useAuth = () => useContext(DataContext);
