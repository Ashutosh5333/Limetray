import React from 'react';
export default function Skeleton({ className='h-6 w-full rounded' }) {
  return <div className={'skeleton ' + className} aria-hidden="true" />;
}
