export async function getUserLocation() {
  try {
    const res = await fetch("https://ipwho.is/", { cache: "no-store" });
    if (!res.ok) return null;

    const data = await res.json();

    return {
      city: data.city || null,
      country: data.country || null,
    };
  } catch (err) {
    console.error("Error fetching location:", err);
    return null;
  }
}
