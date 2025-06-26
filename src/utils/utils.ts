import type { CollectionEntry } from "astro:content";
import type { ContentType } from "./consts.ts";

// Capitalizes the First Character of the String for Website Titles
export function capitalize(text: ContentType) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Get URL based on Content Type and Content ID
export function getURL(id: string, type: ContentType) {
  return `/${type}/${id}`;
}

// PageFind Helpers
export function getPageFindDate(date: Date) {
  return `date:${new Date(date).toISOString().split("T")[0]}`;
}
export function getTags(posts: any) {
  const allTags = posts
    .map((post: { data: { tags: any } }) => post.data.tags)
    .flat();
  return [...new Set(allTags)].sort();
}
// Slugifies the route
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Filters posts in the content collections
export function filterPosts(
  posts: CollectionEntry<ContentType>[],
  {
    sortByDate = true,
    filterByFeatured = false,
    limit = undefined,
  }: {
    sortByDate?: boolean;
    filterByFeatured?: boolean;
    limit?: number;
  } = {},
) {
  // Start with a fresh copy to avoid mutating the original
  let filteredPosts = [...posts];
  // Filter by Featured
  if (filterByFeatured) {
    filteredPosts = filteredPosts.filter((post) => post.data.featured);
  }

  // Sort by Date
  if (sortByDate) {
    filteredPosts.sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );
  }
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
