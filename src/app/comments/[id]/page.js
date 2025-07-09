import getComment from "@/functions/getComment";
import React from "react";

export default async function PostComment({ params }) {
  const { id } = await params;

  const comments = await getComment(id);

  console.log(comments);

  console.log(id);
  return (
    <div>
      <p className="mb-5">Post no : {id}</p>
      {comments?.map((com) => (
        <div key={com?.id} className="border-2 mb-4">
          <p>name : {com?.name}</p>

          <p>email : {com?.email}</p>
          <p>comment: {com?.body}</p>
        </div>
      ))}
    </div>
  );
}
