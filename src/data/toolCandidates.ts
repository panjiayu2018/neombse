export interface ToolCandidate {
  priority: 'P2' | 'P3';
  name: string;
  area: string;
  function: string;
  website: string;
  reviewNote: string;
}

export const toolCandidates: ToolCandidate[] = [
  {
    priority: 'P2',
    name: 'Astah SysMLv2 Modeler',
    area: 'SysML v2',
    function: 'VS Code graphical and textual editor',
    website: 'https://astah.net/products/sysmlv2-modeler/',
    reviewNote: 'The vendor still labels this product Coming Soon / early access; move it only after a public release and licensing terms are available.',
  },
  {
    priority: 'P3',
    name: 'GenMyModel',
    area: 'UML',
    function: 'Browser model editor',
    website: 'https://www.genmymodel.com/',
    reviewNote: 'Verify current product availability, XMI support, licensing, and maintenance status.',
  },
  {
    priority: 'P2',
    name: 'Elan8',
    area: 'SysML v2',
    function: 'Unverified editor project',
    website: 'https://github.com/elan8',
    reviewNote: 'The repository URL cited by the external audit could not be verified. Keep out of the directory until a durable first-party source is found.',
  },
  {
    priority: 'P2',
    name: 'SysArchX',
    area: 'SysML v2',
    function: 'Unverified architecture tool',
    website: 'https://github.com/sysarchx',
    reviewNote: 'The repository URL cited by the external audit could not be verified. Keep out of the directory until a durable first-party source is found.',
  },
  {
    priority: 'P3',
    name: 'Eclipse Capella',
    area: 'Arcadia / MBSE',
    function: 'Architecture modeling',
    website: 'https://mbse-capella.org/',
    reviewNote: 'Standalone Capella uses Arcadia rather than UML or SysML and remains outside the directory scope; the SysON-based Capella implementation is listed separately.',
  },
];
