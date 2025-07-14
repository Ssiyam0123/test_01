"use client";

import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page refresh

    if (!signInLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      console.log("✅ Logged in:", result);
      await setActive({ session: result.createdSessionId });

      // Optional: redirect to dashboard or homepage
      // router.push("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error?.errors?.[0]?.message || error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Login page</p>

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
        <p>
          Don’t have an account? <Link href={"/sign-up"}>Register now.</Link>
        </p>
      </div>
    </form>
  );
}
