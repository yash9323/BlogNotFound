"use client"
import React from 'react';
import ShowAllBlogs from './(components)/ShowAllBlogs';

const homepage = () => {
  return (
    <div>
      <ShowAllBlogs/>
      <a href="/createblog" className='fixed w-5 h-5 bottom-2 right-1 border border-white p-5 rounded-full align-middle'>
          +
      </a>
    </div>
  );
}

export default homepage;