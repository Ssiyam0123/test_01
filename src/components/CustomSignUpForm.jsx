"use client";

import { useState } from "react";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CustomSignUpForm() {
  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (!signUpLoaded) return;

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error(err);
      alert(err.errors?.[0]?.message || "Signup failed");
    }
  };

  const handleVerify = async () => {
    if (!signUpLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setSignUpActive({ session: result.createdSessionId });
        router.push("/"); // redirect after success
      } else {
        alert("Incorrect code");
      }
    } catch (err) {
      console.error(err);
      alert(err.errors?.[0]?.message || "Verification failed");
    }
  };

  const handleGoogleLogin = async () => {
    if (!signInLoaded) return;

    try {
      const resis = await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/", // Or wherever you want users to land after login
      });
      console.log("collecting res : ", resis);
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      {!pendingVerification ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Create an account</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignUp}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mb-4"
          >
            Sign Up with Email
          </button>

          <div className="text-center my-4 text-sm text-gray-500">or</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Continue with Google
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
          <input
            type="text"
            placeholder="Verification code"
            className="w-full border p-2 mb-4 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={handleVerify}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Verify Email
          </button>
        </>
      )}
    </div>
  );
}
