"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Contact from "@/components/Contact/Contact";

export default function ContactClient() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");

  useEffect(() => {
    const nameFromQuery = searchParams.get("name");
    if (nameFromQuery) setName(nameFromQuery);
  }, [searchParams]);

  return <Contact name={name} />;
}
