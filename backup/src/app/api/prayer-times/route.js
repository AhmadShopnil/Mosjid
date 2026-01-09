// src/app/api/prayer-times/route.ts
import { NextResponse } from "next/server";

let cacheData;
let cacheTime = 0;

export async function GET() {
  const now = Date.now();
  const CACHE_DURATION = 3600000; // 1 hour

  // If cached → return immediately
  if (cacheData && now - cacheTime < CACHE_DURATION) {
    return NextResponse.json({ cached: true, ...cacheData });
  }

  const city = "Osaka";
  const country = "Japan";
  const method = 3;

  try {
    const shafiRes = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}&school=1`
    );

    const hanafiRes = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}&school=0`
    );

    if (!shafiRes.ok || !hanafiRes.ok) {
      throw new Error("Failed to fetch prayer times");
    }

    const shafi = await shafiRes.json();
    const hanafi = await hanafiRes.json();

    const responseData = { shafi, hanafi };

    // Update cache
    cacheData = responseData;
    cacheTime = now;

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Prayer Times API Error:", error);

  
    if (cacheData) {
      return NextResponse.json({
        error: "Failed to fetch new data, sending cached data",
        ...cacheData,
      });
    }

    
    return NextResponse.json(
      { error: "Failed to fetch prayer times" },
      { status: 500 }
    );
  }
}
