import getSinglePost from "@/functions/getSinglePost";
import React from "react";

export default async function SinglePost({ params }) {
  const { id } = await params;
  const data = await getSinglePost(id);

  return (
    <div>
      <p>User ID : {data?.userId}</p>

      <p>Post No : {data?.id}</p>
      <p>{data?.title}</p>

      <p>{data?.body}</p>
    </div>
  );
}
