import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);

  }
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    })
    
    return () => {
      unSubscribe();
    }
  }, [])

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/users/role/${user.email}`).then(res => {

      setRole(res.data.role);
    })
  }, [user])

  // console.log(role);
  const authInfo = {
    user,
    createUser,
    signInUser,
    updateUser,
    setUser,
    loading,
    setLoading,
    logOut,
    signInWithGoogle,
    role
  }
  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;