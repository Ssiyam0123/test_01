'use client'

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter()
  const {isSignedIn,signOut} = useAuth()
  console.log(isSignedIn)
  const menu = () => {
    return (
      <div className="flex w-[80%] mx-auto justify-between mt-10 mb-10">
        <Link href={"/"}>HOME</Link>
        <Link href={"/posts"}>POSTS</Link>
        <Link href={"/comments"}>COMMENTS</Link>
        <Link href={"/photos"}>PHOTOS</Link>
        <Link href={"/users"}>USERS</Link>
        {
           !isSignedIn ? <Link href={"/sign-up"}>Sign Up</Link> : <button onClick={signOut}>sign out</button>
        }
      </div>
    );
  };
  return <div>{menu()}</div>;
}
