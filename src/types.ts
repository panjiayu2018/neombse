export type EvidenceState = 'Yes' | 'No' | 'Unknown';

export interface Source {
  label: string;
  url: string;
}

export interface FeatureEvidence {
  status: EvidenceState;
  url: string;
  checkedAt: string;
  availability?: 'Built-in' | 'Plugin' | 'Edition-specific' | 'Component-specific' | 'External integration';
  version?: string;
  note?: string;
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
  operatingSystems: string[];
  deliveryModes: string[];
  runtimes: string[];
  hostApplications: string[];
  standards: string[];
  toolTypes: string[];
  sourceLicense: 'Open Source' | 'Proprietary' | 'Source Available' | 'Unknown';
  spdxLicenseId?: string;
  pricingModels: Array<'Free' | 'Free Tier Available' | 'Paid' | 'Custom Quote' | 'Unknown'>;
  licenseTerms: Array<'Perpetual' | 'Subscription' | 'Usage-based' | 'Unknown'>;
  trialAvailable?: boolean | 'Unknown';
  commercialUseAllowed?: boolean | 'Unknown';
  modelingModes: string[];
  features: ToolFeatures;
  featureEvidence?: Partial<Record<keyof ToolFeatures, FeatureEvidence>>;
  classificationNotes?: string[];
  classificationReviewedAt?: string;
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
