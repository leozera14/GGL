import React from 'react';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if(!token) {
    return false
  } else {
    return true;
  }
}