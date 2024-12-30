"use client";

import { signIn, signOut } from "next-auth/react";

export function SignIn() {
  return (
    <button
      className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={() => signIn()}
    >
      로그인
    </button>
  );
}

export function SignOut() {
  return (
    <button
      className="rounded-xl bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={() => signOut()}
    >
      로그아웃
    </button>
  );
}
