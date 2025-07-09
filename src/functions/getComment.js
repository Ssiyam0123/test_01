import React from "react";

export default async function getComment( id ) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  const data = res.json();

  return data;
}
