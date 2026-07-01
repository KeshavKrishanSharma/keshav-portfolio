// lib/labProjects.ts — Gen AI / Agentic Lab project directory.
// Each entry is an independently built + deployed app (own repo, own stack —
// see README for the "single domain, many small apps" hosting approach).
// Add real entries here as projects ship; flip `status` to 'live' and set
// `href` (ideally a subdomain of this site, e.g. project-name.<domain>) once
// a project is reachable.

export type LabProjectStatus = 'live' | 'building' | 'planned';

export interface LabProject {
  id: string;
  title: string;
  category: 'Generative AI' | 'AI Agent';
  tagline: string;
  description: string;
  stack: string[];
  status: LabProjectStatus;
  /** External URL — a live project's own deployment (e.g. a subdomain). */
  href?: string;
}

export const labProjects: LabProject[] = [
  {
    id: 'first-genai-build',
    title: 'First Gen AI build',
    category: 'Generative AI',
    tagline: 'Coming soon',
    description:
      'A generative AI project, built end to end — React/Next.js on the front, Python where the model logic lives. Details land here once it ships.',
    stack: ['Next.js', 'React', 'Python', 'FastAPI'],
    status: 'planned'
  },
  {
    id: 'first-agent-build',
    title: 'First autonomous agent',
    category: 'AI Agent',
    tagline: 'Coming soon',
    description:
      'An agentic build with real multi-step reasoning and tool use — not a wrapper around a single prompt. Deployed under this domain once live.',
    stack: ['Python', 'FastAPI', 'Agent framework'],
    status: 'planned'
  }
];
