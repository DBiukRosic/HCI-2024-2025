"use client";
import { useEffect, useState } from "react";

export default function ClientTime({ iso }: { iso: string }) {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    setTxt(new Date(iso).toLocaleString());
  }, [iso]);
  return <time dateTime={iso}>{txt || "…"}</time>;
}