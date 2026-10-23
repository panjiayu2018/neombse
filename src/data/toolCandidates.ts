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
    name: 'Sensmetry Sysand',
    area: 'SysML v2',
    function: 'Model-library package manager',
    website: 'https://beta.sysand.org/',
    reviewNote: 'Verify lifecycle, licensing, and whether it should be classified as infrastructure rather than an editor.',
  },
  {
    priority: 'P2',
    name: 'Mgnite Mg',
    area: 'SysML v2',
    function: 'Jupyter and Python modeling integration',
    website: 'https://www.mgnite.com/mg/',
    reviewNote: 'Confirm delivery modes, API conformance, pricing, and current availability.',
  },
  {
    priority: 'P2',
    name: 'SystemsModeling.com',
    area: 'SysML v2',
    function: 'Cloud modeling and repository service',
    website: 'https://systemsmodeling.com/',
    reviewNote: 'Confirm product status, repository implementation, and ownership before publication.',
  },
  {
    priority: 'P2',
    name: 'Siemens Simcenter Studio',
    area: 'SysML v2',
    function: 'Architecture exploration and analysis',
    website: 'https://www.omg.org/sysml/sysmlv2/sysml-tool/',
    reviewNote: 'Keep separate from Siemens Systems Modeler and verify a direct vendor product page.',
  },
  {
    priority: 'P2',
    name: 'Qualtech TEAMS Toolset',
    area: 'SysML v2 import',
    function: 'Reliability and diagnostic analysis',
    website: 'https://www.teamqsi.com/products/',
    reviewNote: 'Verify the scope of SysML v2 textual import and distinguish analysis from model authoring.',
  },
  {
    priority: 'P2',
    name: 'Violet Labs SysML v2 Integration',
    area: 'SysML v2 integration',
    function: 'Digital-thread connector',
    website: 'https://www.violetlabs.com/',
    reviewNote: 'Classify as a connector, not a modeler; verify supported repositories and exchange boundaries.',
  },
  {
    priority: 'P2',
    name: 'Astah SysMLv2 Modeler',
    area: 'SysML v2',
    function: 'VS Code graphical and textual editor',
    website: 'https://astah.net/products/sysmlv2-modeler/',
    reviewNote: 'Early access: verify public availability and release status before moving into the directory.',
  },
  {
    priority: 'P2',
    name: 'yEd Live',
    area: 'UML drawing',
    function: 'Browser-based general diagramming',
    website: 'https://www.yworks.com/products/yed/download',
    reviewNote: 'Decide whether the web edition merits a separate record from installed yEd.',
  },
  {
    priority: 'P2',
    name: 'UMLetino',
    area: 'UML drawing',
    function: 'Browser edition of UMLet',
    website: 'https://www.umlet.com/',
    reviewNote: 'Decide between a separate edition record and expanding the existing UMLet record.',
  },
  {
    priority: 'P2',
    name: 'Ellidiss SysML v2 VS Code extension',
    area: 'SysML v2',
    function: 'VS Code textual editor',
    website: 'https://www.omg.org/sysml/sysmlv2/sysml-tool/',
    reviewNote: 'Locate a durable vendor page and verify availability, licensing, and supported features.',
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
    priority: 'P3',
    name: 'Creately',
    area: 'UML drawing',
    function: 'Web diagramming and collaboration',
    website: 'https://creately.com/',
    reviewNote: 'Apply the editorial inclusion rule for general-purpose diagramming products.',
  },
  {
    priority: 'P3',
    name: 'Lucidchart',
    area: 'UML drawing',
    function: 'Web diagramming',
    website: 'https://www.lucidchart.com/',
    reviewNote: 'Apply the editorial inclusion rule for general-purpose diagramming products.',
  },
];
