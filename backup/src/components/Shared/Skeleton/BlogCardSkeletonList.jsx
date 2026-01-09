import React from "react";
import BlogCardSkeleton from "./BlogCardSkeleton";

export default function BlogCardSkeletonList() {
  return (
    <div className="flex flex-col gap-2">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
  );
}
