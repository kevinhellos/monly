"use client";

import { auth } from "../config/firebase";
import { useSignInWithGoogle } from "../(hooks)/useSignInWithGoogle";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginProvider({ provider }: { provider: string }) {

  const router = useRouter();

  const signInWithGoogle = useSignInWithGoogle;

  const [username, setUsername] = useState<string>("");
  const usernameInput = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? router.push("/dashboard") : router.push("/login");
    });
  },[]);

  useEffect(() => {
    usernameInput?.current?.focus();
  }, []);

  // If you're lazy to type google, just type "g" :D
  if (provider === "g" || provider === "google") {
    return (
      <div className="card-actions justify-end">
        <button
          type="button"
          className="btn w-full bg-transparent hover:bg-gray-50 font-medium"
          onClick={signInWithGoogle}
        >
          <img
            src="/assets/imgs/google.png"
            width={20}
            height={20}
            alt="Google icon"
          />
          Continue with Google
        </button>
      </div>
    )
  }

  // If you're lazy to type email, just type "e" :D
  if (provider === "e" || provider === "email") {
    return(
      <>
        <input 
          type="text" 
          className="input input-bordered rounded-md mb-3 placeholder:text-gray-300 focus:outline-blue-600" 
          placeholder="Email" 
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          ref={usernameInput}
        />
        <input 
          type="password" 
          className="input input-bordered rounded-md mb-3 placeholder:text-gray-300 focus:outline-blue-600" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button 
          type="button" 
          className="btn w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-700 text-white rounded-md font-medium" 
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
              // const user = userCredential.user;
              if (userCredential) {
                setHasError(false);
                router.push("/dashboard");
              }
            })
            .catch((error) => {
              setIsLoading(false);
              setHasError(true);
              // const errorCode = error.code;
              /// const errorMessage = error.message;
              // console.error(`Error code: ${errorCode}\nError message: ${errorMessage}`);
              // toast.error("Failed to authenticate credential");
            });
          }}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-md text-white"></span>
          ) : (
            "Sign in"
          )}
        </button>

        {hasError && (
          <div className=" mt-3 bg-red-100 text-red-800 px-5 py-3 rounded-md text-sm">
            Fail to authenticate. Please try again.
          </div>
        )}
      </>
    )
  }

  return <div></div>;
}
