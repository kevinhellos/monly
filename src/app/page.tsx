"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    // NOTE: 
    // Since this page is not going to be used,
    // by default it will just redirect to the login page (/login)
    router.push("/login");
  }, []);

  return (<div></div>);
}
