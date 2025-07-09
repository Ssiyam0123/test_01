import { getAllUser } from "@/functions/getAllUser";
import Link from "next/link";

export default async function AllUsersPage() {
  const users = await getAllUser();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {users.map((user) => (
        <Link key={user.id} href={`/users/${user?.id}`}>
          <div className="border-2 p-4">
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
        </Link>
      ))}
    </div>
  );
}
