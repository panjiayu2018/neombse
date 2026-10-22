import type { Tool } from '../types';

const modules = import.meta.glob<{ default: Tool }>('../data/tools/*.json', {
  eager: true,
});

export const tools = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.name.localeCompare(b.name));

export const featuredTools = tools.filter((tool) => tool.featured);

export const formatDate = (value: string | null) => {
  if (!value) return 'Not yet verified';
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
};
