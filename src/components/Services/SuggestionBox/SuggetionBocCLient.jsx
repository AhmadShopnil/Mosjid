"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Contact from "@/components/Contact/Contact";
import ContactBox from "./ContactBox";

export default function SuggetionBocCLient() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");

  useEffect(() => {
    const nameFromQuery = searchParams.get("name");
    if (nameFromQuery) setName(nameFromQuery);
  }, [searchParams]);

  return <ContactBox name={name} />;
}
