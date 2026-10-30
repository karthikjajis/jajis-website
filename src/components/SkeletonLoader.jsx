import React from "react";

export const SkeletonProductCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-4/5 animate-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer"></div>
        </div>

        {/* Price skeleton */}
        <div className="flex gap-2 items-center mb-3">
          <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
          <div className="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded line-through animate-shimmer"></div>
          <div className="h-4 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mt-auto animate-shimmer"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for product details page
 */
export const SkeletonProductDetails = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 pt-8">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"
              ></div>
            ))}
          </div>
        </div>

        {/* Details skeleton */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer"></div>
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-shimmer"></div>
          </div>

          <div className="flex gap-4 my-6">
            <div className="h-7 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
            <div className="h-7 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
          </div>

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer"
              ></div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <div className="flex-1 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
            <div className="h-12 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for cart items
 */
export const SkeletonCartItem = () => {
  return (
    <div className="rounded-lg p-4 flex gap-4 animate-pulse">
      <div className="w-20 h-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/3 animate-shimmer"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for wishlist items
 */
export const SkeletonWishlistItem = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-shimmer"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer"></div>
      </div>
    </div>
  );
};
