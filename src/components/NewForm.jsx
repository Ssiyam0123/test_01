"use client";

import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";

export default function NewForm() {
  const { isLoaded: signUpLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signUpLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      // only needed if you're using email_code strategy
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      await setActive({ session: result.createdSessionId });

      console.log("User signed up:", result);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <span>register page</span>
      <div className="mb-10">
        <label htmlFor="email">Enter your email:</label>
        <input
          id="email"
          className="border-2 p-4 rounded-2xl ml-10"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Enter your password:</label>
        <input
          id="password"
          className="border-2 p-4 rounded-2xl ml-10"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div id="clerk-captcha" />

      <div className="mt-5 w-[80%] mx-auto">
        <button
          type="submit"
          className="btn p-2 border-2 cursor-pointer rounded-4xl"
        >
          Submit
        </button>
      </div>
      <div>
        <p>allready have an account? <Link href={'/log-in'}>log in.</Link></p>
      </div>
    </form>
  );
}
