"use client";

import { useState } from "react";

export default function Page() {
  const [error, setError] = useState(false);

  if (error) throw new Error("@@");
  return (
    <button
      onClick={() => {
        setError(true);
      }}
    >
      오류
    </button>
  );
}
