export type EvidenceState = 'Yes' | 'No' | 'Unknown';

export interface Source {
  label: string;
  url: string;
}

export interface ToolFeatures {
  xmiImport: EvidenceState;
  xmiExport: EvidenceState;
  collaboration: EvidenceState;
  codeGeneration: EvidenceState;
  reverseEngineering: EvidenceState;
  simulation: EvidenceState;
  requirementsManagement: EvidenceState;
  sysmlV2Api: EvidenceState;
}

export interface Tool {
  id: string;
  name: string;
  vendor: string;
  website: string;
  description: string;
  editorialNote: string;
  platforms: string[];
  accessModes: string[];
  runtimes: string[];
  standards: string[];
  toolTypes: string[];
  licenseTypes: string[];
  modelingModes: string[];
  features: ToolFeatures;
  latestVersion: string | null;
  releaseDate: string | null;
  lastChecked: string;
  image?: string;
  sourceDescriptionZh?: string;
  sourceUpdatedText?: string;
  sourceCollection?: string;
  sources: Source[];
  featured: boolean;
}
