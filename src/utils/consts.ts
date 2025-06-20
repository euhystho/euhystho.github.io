// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Head Properties
export const SITE_AUTHOR = "Eugene Thompson";
export const SITE_TITLE = "Hi, I'm Eugene! 👋🏻";
export const SITE_DESCRIPTION =
  "Eugene Thompson's personal website showcasing projects, academic achievements, and professional aspirations";
export const KEYWORDS = "";

// Theme Properties
export const ACCENT_COLOR = "#f59e0b";

//Social Links
export const GITHUB_LINK = "https://github.com/euhystho";
export const GITHUB_COLOR = "#181717";
export const EMAIL = "mailto:hello@eugenehysthompson.com";
export const EMAIL_COLOR = "#212121";

// Content Collection Types
export type ContentType = "projects" | "writings";

// Content configurations based on type
export const ContentConfig: Record<
  ContentType,
  {
    description: string;
    itemLinkText: string;
  }
> = {
  projects: {
    description:
      "A selection of projects that showcase my growth as a developer: from passionate first attempts to sophisticated solutions that solve real problems.",
    itemLinkText: "Read the story",
  },
  writings: {
    description:
      "A collection of my thoughts, experiences, and insights on software development, data science, and personal growth.",
    itemLinkText: "Read article",
  },
};
