export interface ArticleSummary {
  slug: string;
  title: string;
  authors: string[];
  category: string;
  publishedLabel: string;
  summary: string;
  coverImage: string;
  coverAlt: string;
  figureCount: number;
}

export const articles: ArticleSummary[] = [
  {
    slug: 'modeling-optogenetics-with-sysml-v2',
    title: 'Light Knocks on the Nervous System: Modeling the 2026 Nobel Prize in Physiology or Medicine with SysML v2',
    authors: ['Jiayu Pan', 'Fengmei Lü'],
    category: 'Applied SysML v2',
    publishedLabel: 'October 2026',
    summary: 'A worked SysML v2 model of optogenetic control, from targeted expression and light delivery to photocurrents, neuronal responses, and aftereffects.',
    coverImage: '/articles/modeling-optogenetics-with-sysml-v2/figure-01-expression-system.png',
    coverAlt: 'SysML v2 part definition for an optogenetic expression system',
    figureCount: 19,
  },
];

export const featuredArticle = articles[0];
