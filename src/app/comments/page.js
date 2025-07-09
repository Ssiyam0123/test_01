import getAllComments from '@/functions/getAllComments'
import React from 'react'

export default async function CommentsPage() {

const comments = await getAllComments()


  // console.log(comments)
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-10 '>
       {comments?.map((com) => (
        <div key={com?.id} className="border-2 mb-4 p-3 space-y-2.5">
          <p>name : {com?.name}</p>

          <p>email : {com?.email}</p>
          <p>comment: {com?.body}</p>
        </div>
      ))}
    </div>
  )
}
