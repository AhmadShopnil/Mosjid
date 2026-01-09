import React from "react";
import BlogCardSkeleton from "./BlogCardSkeleton";
import EventCardSkeleton from "./EventCardSkeleton";

export default function EventCardSkeletonList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  );
}
