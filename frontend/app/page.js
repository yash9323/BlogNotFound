"use client"
import { signOut } from 'next-auth/react';
import React from 'react';

const homepage = () => {
  return (
    <div>
      Home page
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default homepage;