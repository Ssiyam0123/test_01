import { getUser } from "@/functions/getPost";
import Link from "next/link";
import React from "react";

export default async function PostCard() {
  const data = await getUser();

//   console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {data?.map((c) => (
        <div key={c?.id} className="border-2 p-3">
          <p>post no : {c?.id}</p>
          <p>user id : {c?.userId}</p>
          <p> {c?.title}</p>
          <p> {c?.body}</p>
          <Link href={`/posts/${c?.id}`}><button className="border-2 p-3 mt-3 rounded-2xl cursor-pointer mr-4">details</button></Link>
          <Link href={`/comments/${c?.id}`}><button className="border-2 p-3 mt-3 rounded-2xl cursor-pointer mr-4">comments</button></Link>
          <Link href={`/users/${c?.userId}`}><button className="border-2 p-3 mt-3 rounded-2xl cursor-pointer">User Details</button></Link>
        </div>
      ))}
    </div>
  );
}
