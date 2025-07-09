import { getSingleUser } from "@/functions/getSingleUser";
import React from "react";

export default async function UserPage({ params }) {
  const { id } = await params;
  const user = await getSingleUser(id);
  console.log(user);
  return (
    <div>
      <div key={user.id} className="border-2 p-4">
        <p>id: {user.id}</p>
        <p>name: {user.name}</p>
        <p>username: {user.username}</p>
        <p>email: {user.email}</p>
        <p>address:</p>
        <p>street: {user.address.street}</p>
        <p>suite: {user.address.suite}</p>
        <p>city: {user.address.city}</p>
        <p>zipcode: {user.address.zipcode}</p>
      </div>
    </div>
  );
}
