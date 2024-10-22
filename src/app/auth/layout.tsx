import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-1 mx-auto min-h-screen justify-center items-center'>
        {children}
    </div>
  )
}
