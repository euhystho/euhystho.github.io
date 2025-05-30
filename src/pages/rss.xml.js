import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_AUTHOR, SITE_DESCRIPTION } from "../utils/consts";

export async function GET(context) {
  const posts = await getCollection("projects");
  return rss({
    title: SITE_AUTHOR,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/projects/${post.id}/`,
    })),
  });
}
