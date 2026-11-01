const REVIEWED_AT = '2026-11-01';
const DESKTOP_OS = ['Windows', 'macOS', 'Linux'];

const OS_OVERRIDES = {
  apollon: [],
  'astah-professional': DESKTOP_OS,
  'asyst-rendering-modeler': ['Windows', 'Linux'],
  'diagrams-net-desktop': ['Windows', 'macOS', 'Linux', 'ChromeOS'],
  'easy-uml-editor': [],
  'eclipse-papyrus': DESKTOP_OS,
  edrawmax: DESKTOP_OS,
  gojs: [],
  'ibm-rhapsody-systems-engineering': [],
  'itemis-create': DESKTOP_OS,
  jetuml: DESKTOP_OS,
  kuml: DESKTOP_OS,
  'lsp-uml': DESKTOP_OS,
  magicdraw: DESKTOP_OS,
  mermaid: [],
  moqups: [],
  'papyrus-web': [],
  plantuml: DESKTOP_OS,
  py2puml: DESKTOP_OS,
  'rational-software-architect-designer': DESKTOP_OS,
  'su-statemodeler': DESKTOP_OS,
  'sinelabore-rt': DESKTOP_OS,
  smartdraw: [],
  'state-machine-cat': [],
  statesmith: DESKTOP_OS,
  sysgit: [],
  'sysml-v2-studio': DESKTOP_OS,
  'sysml-v2-language-support': DESKTOP_OS,
  syson: [],
  umbrello: ['Linux', 'Windows', 'macOS'],
  umlet: DESKTOP_OS,
  umple: [],
  'visual-paradigm': DESKTOP_OS,
  'yed-graph-editor': DESKTOP_OS,
};

const DELIVERY_OVERRIDES = {
  'asyst-rendering-modeler': ['IDE Extension', 'Desktop Application'],
  'clang-uml': ['CLI'],
  'easy-uml-editor': ['Web Application'],
  edrawmax: ['Web Application', 'Desktop Application'],
  gojs: ['Library / SDK'],
  mermaid: ['Library / SDK'],
  'itemis-create': ['Desktop Application', 'IDE Extension', 'Web Application'],
  kuml: ['Web Application', 'Desktop Application', 'CLI', 'IDE Extension'],
  'omnigraffle-ios': ['Mobile Application'],
  plantuml: ['CLI', 'IDE Extension', 'Library / SDK', 'API Service'],
  py2puml: ['CLI', 'Library / SDK'],
  'state-machine-cat': ['CLI', 'Web Application', 'Library / SDK'],
  'su-statemodeler': ['Desktop Application', 'IDE Extension'],
  syside: ['IDE Extension', 'CLI', 'Library / SDK'],
  'sysml-v2-pilot': ['IDE Extension', 'Notebook Integration', 'CLI', 'Desktop Application'],
  statesmith: ['CLI', 'Library / SDK'],
  umlet: ['Desktop Application', 'IDE Extension', 'Web Application'],
  umple: ['Web Application', 'CLI', 'IDE Extension'],
  'yed-graph-editor': ['Desktop Application', 'Web Application'],
};

const RUNTIME_OVERRIDES = {
  apollon: ['Browser JavaScript'],
  'astah-professional': ['JVM'],
  'diagrams-net-desktop': ['Electron'],
  'easy-uml-editor': ['Browser JavaScript'],
  'eclipse-papyrus': ['JVM'],
  edrawmax: ['Browser JavaScript'],
  gaphor: ['Python'],
  gojs: ['Browser JavaScript'],
  'ibm-rhapsody-systems-engineering': ['Browser JavaScript'],
  'itemis-create': ['JVM', 'Browser JavaScript'],
  jetuml: ['JVM'],
  kuml: ['JVM', 'Browser JavaScript'],
  magicdraw: ['JVM'],
  mermaid: ['Browser JavaScript', 'Node.js'],
  moqups: ['Browser JavaScript'],
  'papyrus-web': ['Browser JavaScript'],
  plantuml: ['JVM'],
  py2puml: ['Python'],
  'rational-software-architect-designer': ['JVM'],
  'su-statemodeler': ['JVM'],
  'sinelabore-rt': ['JVM'],
  smartdraw: ['Browser JavaScript'],
  'state-machine-cat': ['Node.js', 'Browser JavaScript'],
  statesmith: ['.NET'],
  sysgit: ['Browser JavaScript'],
  syside: ['Python'],
  syson: ['Browser JavaScript'],
  umlet: ['JVM', 'Browser JavaScript'],
  umple: ['JVM', 'Browser JavaScript'],
  'visual-paradigm': ['JVM'],
  'yed-graph-editor': ['JVM', 'Browser JavaScript'],
};

const HOST_OVERRIDES = {
  'asyst-rendering-modeler': ['VS Code'],
  'easy-uml-editor': ['Confluence'],
  'eclipse-papyrus': ['Eclipse'],
  'itemis-create': ['Eclipse', 'VS Code'],
  kuml: ['IntelliJ IDEA', 'Obsidian'],
  'lsp-uml': ['VS Code'],
  syside: ['VS Code'],
  'sysml-v2-pilot': ['Eclipse', 'JupyterLab'],
  'sysml-v2-studio': ['VS Code'],
  'sysml-v2-language-support': ['VS Code'],
  'su-statemodeler': ['Eclipse'],
  umlet: ['Eclipse', 'VS Code'],
  umple: ['Eclipse', 'VS Code'],
};

const OPEN_SOURCE_IDS = new Set([
  'apollon', 'clang-uml', 'crystal-facet-uml', 'decisym-sysmlv2-gui',
  'diagrams-net-desktop', 'eclipse-papyrus', 'gaphor', 'jetuml', 'kuml',
  'lsp-uml', 'mermaid', 'modelio', 'papyrus-web', 'plantuml', 'py2puml',
  'state-machine-cat', 'statesmith', 'sysml-v2-pilot', 'sysml-v2-studio',
  'sysml-v2-language-support', 'syson', 'umbrello', 'umlet', 'umple',
  'violet-uml-editor',
]);

const PROPRIETARY_IDS = new Set([
  'astah-professional', 'asyst-rendering-modeler', 'catia-magic-cameo-sysml-v2', 'conceptdraw-diagram',
  'easy-uml-editor', 'edrawmax', 'enterprise-architect', 'erpdesk', 'gojs',
  'iar-visual-state', 'ibm-rhapsody', 'ibm-rhapsody-systems-engineering',
  'itemis-create', 'magicdraw', 'moqups', 'next-design', 'omnigraffle-ios',
  'omnigraffle-mac', 'ptc-modeler', 'rational-software-architect-designer',
  'qp-modeler', 'runway', 'sinelabore-rt', 'smartdraw', 'software-ideas-modeler', 'staruml',
  'su-statemodeler', 'sysgit', 'syside', 'trufun-modeling-platform', 'uml-diagrammer',
  'umodel', 'visual-paradigm', 'yed-graph-editor',
]);

const UNKNOWN_LICENSE_IDS = new Set([
]);

const SOURCE_AVAILABLE_IDS = new Set(['bouml']);

const FREE_IDS = new Set([
  ...OPEN_SOURCE_IDS,
  'bouml', 'qp-modeler', 'su-statemodeler', 'yed-graph-editor',
]);

const PAID_IDS = new Set([...PROPRIETARY_IDS].filter((id) => ![
  'moqups', 'software-ideas-modeler', 'yed-graph-editor',
].includes(id)));

const UNKNOWN_PRICING_IDS = new Set([
  'runway', 'trufun-modeling-platform',
]);

const CLASSIFICATION_NOTES = {
  'astah-professional': ['The desktop product supports Windows, macOS, and Linux; JVM is a runtime, not an operating system.'],
  'asyst-rendering-modeler': ['The extension is proprietary and offered in Free and Pro tiers; Pre-alpha describes product maturity, not an open-source license.'],
  bouml: ['BOUML 7.x is free to use, while only selected plug-outs are GPL-licensed; the current application is therefore classified Source Available rather than Open Source.'],
  'catia-magic-cameo-sysml-v2': ['Capabilities vary across the CATIA Magic, Cameo, and SysML v2 product family; do not assume every edition includes every feature.'],
  'clang-uml': ['Reverse engineering means converting C/C++ AST data into PlantUML, Mermaid, or JSON diagrams.'],
  gojs: ['GoJS is a JavaScript diagramming library / SDK, not a ready-to-use UML modeling application.'],
  'itemis-create': ['The product family includes Eclipse desktop, VS Code, and browser editions; capabilities can vary by edition.'],
  'enterprise-architect': ['Enterprise Architect supports SysML 1.1 through 1.5. SysML availability depends on the edition or an MDG Technology license.'],
  mermaid: ['This record covers the MIT-licensed Mermaid renderer. Mermaid Chart is a separate commercial service.'],
  'papyrus-web': ['Desktop Eclipse Papyrus extensions do not automatically establish equivalent Papyrus Web capabilities.'],
  plantuml: ['Graphviz may be required for some diagram types.'],
  py2puml: ['Reverse engineering means converting Python code to UML notation, not creating an XMI semantic model repository.'],
  'qp-modeler': ['QM is proprietary freeware under its own EULA. Generated C/C++ code follows the selected QP framework license and may require a commercial QP license for closed-source distribution.'],
  'software-ideas-modeler': ['XMI import and export require Professional or Ultimate editions; other capabilities also vary by edition.'],
  staruml: ['XMI, reverse engineering, and code generation can require separately installed extensions.'],
  'state-machine-cat': ['Diagram rendering and SCXML transformation are not counted as target-language code generation.'],
  syside: ['This record covers the current Syside family. The deprecated Syside Editor Legacy codebase is a separate archived LGPL project.'],
  'sysml-v2-pilot': ['The editor, notebook, and API Services are separable components of the pilot release.'],
  syson: ['A product-specific GraphQL API is not equivalent to the standard SysML v2 API; standard API support remains Unknown.'],
  umlet: ['This record covers the UMLet family, including desktop/IDE editions and the official UMLetino web edition.'],
  'visual-paradigm': ['The verified simulation claim is for business-process simulation and should not be read as arbitrary UML/SysML behavior execution.'],
  'yed-graph-editor': ['yEd is proprietary freeware available for Windows, macOS, and Linux.'],
};

const SPDX_LICENSES = {
  apollon: 'MIT',
  'clang-uml': 'Apache-2.0',
  'crystal-facet-uml': 'GPL-3.0-only',
  'decisym-sysmlv2-gui': 'MIT',
  'diagrams-net-desktop': 'Apache-2.0',
  'eclipse-papyrus': 'EPL-2.0',
  gaphor: 'Apache-2.0',
  jetuml: 'GPL-3.0-or-later',
  kuml: 'Apache-2.0',
  'lsp-uml': 'MIT',
  mermaid: 'MIT',
  modelio: 'GPL-3.0-only',
  'papyrus-web': 'EPL-2.0',
  plantuml: 'GPL-3.0-or-later',
  py2puml: 'MIT',
  'state-machine-cat': 'MIT',
  statesmith: 'Apache-2.0',
  'sysml-v2-pilot': 'EPL-2.0',
  'sysml-v2-studio': 'MIT',
  'sysml-v2-language-support': 'MIT',
  syson: 'EPL-2.0',
  umbrello: 'GPL-2.0-or-later',
  umlet: 'GPL-3.0-only',
  umple: 'MIT',
  'violet-uml-editor': 'GPL-3.0-or-later',
};

const PRODUCT_OVERRIDES = {
  'asyst-rendering-modeler': {
    pricingModels: ['Free Tier Available', 'Paid'],
    sources: [{ label: 'Official VS Code Marketplace page', url: 'https://marketplace.visualstudio.com/items?itemName=juce.asyst-vscode' }],
  },
  bouml: {
    website: 'https://www.bouml.fr/',
    sources: [
      { label: 'Official BOUML site', url: 'https://www.bouml.fr/' },
      { label: 'Official BOUML licensing terms', url: 'https://www.bouml.fr/legal-mentions.html' },
    ],
  },
  'clang-uml': {
    toolTypes: ['Reverse engineering tool'],
    spdxLicenseId: 'Apache-2.0',
    sources: [
      { label: 'Official documentation', url: 'https://clang-uml.github.io/' },
      { label: 'Official source repository', url: 'https://github.com/bkryza/clang-uml' },
    ],
  },
  'enterprise-architect': {
    website: 'https://sparxsystems.com/products/ea/',
    standards: ['UML', 'SysML v1'],
    sources: [
      { label: 'Official product page', url: 'https://sparxsystems.com/products/ea/' },
      { label: 'Official SysML user guide', url: 'https://sparxsystems.com/enterprise_architect_user_guide/17.1/modeling_languages/sysml.html' },
    ],
  },
  edrawmax: {
    website: 'https://www.edrawsoft.com/edraw-max/',
    sources: [{ label: 'Official EdrawMax product page', url: 'https://www.edrawsoft.com/edraw-max/' }],
  },
  mermaid: {
    vendor: 'Mermaid project',
    website: 'https://mermaid.js.org/',
    description: 'An open-source JavaScript diagram renderer that turns Markdown-like text into flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, and other visuals.',
    spdxLicenseId: 'MIT',
    sources: [{ label: 'Mermaid documentation', url: 'https://mermaid.js.org/' }],
  },
  gojs: {
    toolTypes: ['Library / SDK'],
  },
  'ibm-rhapsody': {
    website: 'https://www.ibm.com/products/engineering-rhapsody',
    sources: [{ label: 'Official IBM Engineering Rhapsody page', url: 'https://www.ibm.com/products/engineering-rhapsody' }],
  },
  jetuml: {
    toolTypes: ['Diagramming tool'],
    spdxLicenseId: 'GPL-3.0-or-later',
    sources: [{ label: 'Official JetUML site', url: 'https://www.jetuml.org/' }],
  },
  kuml: {
    modelingModes: ['Graphical', 'Textual'],
    spdxLicenseId: 'Apache-2.0',
  },
  magicdraw: {
    latestVersion: '2026x Refresh1',
    releaseDate: '2026-06-26',
    sources: [
      { label: 'Official MagicDraw product page', url: 'https://www.3ds.com/products/catia/no-magic/magicdraw' },
      { label: 'Official 2026x Refresh1 release announcement', url: 'https://3dswym.3dexperience.3ds.com/post/catia-mbse-cyber-systems/now-released-2026x-refresh1_nS0Ya-VaT9OtOoj6dnPSRg' },
    ],
  },
  'papyrus-web': {
    toolTypes: ['Model editor'],
    spdxLicenseId: 'EPL-2.0',
  },
  py2puml: {
    toolTypes: ['Reverse engineering tool', 'Library / SDK'],
    spdxLicenseId: 'MIT',
    sources: [{ label: 'Official source repository', url: 'https://github.com/lucsorel/py2puml' }],
  },
  'qp-modeler': {
    sources: [
      { label: 'Official QM product page', url: 'https://www.state-machine.com/products/qm' },
      { label: 'Official QM license', url: 'https://www.state-machine.com/qm/license.html' },
    ],
  },
  statesmith: {
    modelingModes: ['Graphical', 'Textual'],
    spdxLicenseId: 'Apache-2.0',
    sources: [{ label: 'Official source repository', url: 'https://github.com/StateSmith/StateSmith' }],
  },
  'sysml-v2-language-support': {
    spdxLicenseId: 'MIT',
  },
  'sysml-v2-pilot': {
    latestVersion: '2026-09',
    releaseDate: '2026-10-23',
    spdxLicenseId: 'EPL-2.0',
    sources: [{ label: 'Official SysML v2 release repository', url: 'https://github.com/Systems-Modeling/SysML-v2-Release/releases' }],
  },
  syside: {
    deliveryModes: ['IDE Extension', 'CLI', 'Library / SDK'],
    runtimes: ['Python'],
    pricingModels: ['Free Tier Available', 'Paid'],
    licenseTerms: ['Subscription'],
    sources: [{ label: 'Official Syside product page', url: 'https://sensmetry.com/syside/' }],
  },
  'sysml-v2-studio': {
    name: 'SysML v2 Studio for VS Code',
  },
  umbrello: {
    latestVersion: '26.08.2',
    releaseDate: '2026-10-08',
    description: 'An open-source UML modeling application from the KDE ecosystem with source-code generation and distributions for Linux and Windows.',
  },
  umlet: {
    toolTypes: ['Diagramming tool'],
    spdxLicenseId: 'GPL-3.0-only',
    sources: [
      { label: 'Official UMLet site', url: 'https://www.umlet.com/' },
      { label: 'Official UMLetino web edition', url: 'https://www.umletino.com/' },
    ],
  },
  umple: {
    spdxLicenseId: 'MIT',
    sources: [{ label: 'Official source repository', url: 'https://github.com/umple/umple' }],
  },
  'yed-graph-editor': {
    website: 'https://www.yworks.com/products/yed',
    sources: [
      { label: 'Official yEd product page', url: 'https://www.yworks.com/products/yed' },
      { label: 'Official yEd Live page', url: 'https://www.yworks.com/yed-live/' },
    ],
  },
  'visual-paradigm': {
    latestVersion: '18.0',
    standards: ['UML', 'SysML v1'],
  },
};

const source = (status, url, note, availability) => ({
  status,
  url,
  checkedAt: REVIEWED_AT,
  ...(note ? { note } : {}),
  ...(availability ? { availability } : {}),
});

const FEATURE_AUDIT = {
  apollon: {
    collaboration: source('Yes', 'https://github.com/ls1intum/Apollon', 'The official repository describes collaborative online modeling.', 'Built-in'),
  },
  bouml: {
    codeGeneration: source('Yes', 'https://www.bouml.fr/legal-mentions.html', 'The official licensing page explicitly covers built-in language generators.'),
    reverseEngineering: source('Yes', 'https://www.bouml.fr/legal-mentions.html', 'The official licensing page explicitly covers language reverse-engineering tools.'),
  },
  'clang-uml': {
    reverseEngineering: source('Yes', 'https://clang-uml.github.io/', 'Generates diagrams from C/C++ source via Clang AST data.', 'Built-in'),
  },
  'enterprise-architect': {
    xmiImport: source('Yes', 'https://imap.sparxsystems.com/enterprise_architect_user_guide/17.2/model_exchange/importexport.html'),
    xmiExport: source('Yes', 'https://imap.sparxsystems.com/enterprise_architect_user_guide/17.2/model_exchange/importexport.html'),
    codeGeneration: source('Yes', 'https://news.sparxsystems.com/enterprise_architect_user_guide/17.2/modeling_domains/software_getting_started.html'),
    reverseEngineering: source('Yes', 'https://news.sparxsystems.com/enterprise_architect_user_guide/17.2/modeling_domains/software_getting_started.html'),
    collaboration: source('Yes', 'https://sparxsystems.com/products/ea/', 'Shared repositories and team collaboration vary by deployment.', 'Edition-specific'),
    requirementsManagement: source('Yes', 'https://sparxsystems.com/products/ea/', 'The official product page describes requirements and traceability.', 'Built-in'),
  },
  'astah-professional': {
    xmiImport: source('Yes', 'https://astah.net/products/plugins-integrations/', 'Requires the XMI extension; supported versions and diagram fidelity are limited.', 'Plugin'),
    xmiExport: source('Yes', 'https://astah.net/products/plugins-integrations/', 'Requires the XMI extension; supported versions and diagram fidelity are limited.', 'Plugin'),
    codeGeneration: source('Yes', 'https://astah.net/products/astah-professional/'),
    reverseEngineering: source('Yes', 'https://astah.net/products/astah-professional/'),
    collaboration: source('Yes', 'https://astah.net/products/astah-professional/', 'Team workflows rely on supported sharing and merge integrations.', 'External integration'),
    requirementsManagement: source('Yes', 'https://astah.net/products/compare-editions/', 'Model-level requirements and traceability; not necessarily enterprise requirements management.', 'Edition-specific'),
  },
  'eclipse-papyrus': {
    codeGeneration: source('Unknown', 'https://eclipse.dev/papyrus/', 'Current first-party material did not establish code generation in the base Papyrus distribution; add-ons are separate.'),
  },
  edrawmax: {
    collaboration: source('Yes', 'https://www.edrawsoft.com/edraw-max/', 'The official product page describes collaborative diagram editing.', 'Edition-specific'),
  },
  'ibm-rhapsody': {
    xmiImport: source('Yes', 'https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/design-rhapsody/10.0.3?topic=tools-exchanging-model-data-by-using-xmi', undefined, 'Edition-specific'),
    xmiExport: source('Yes', 'https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/design-rhapsody/10.0.3?topic=tools-exchanging-model-data-by-using-xmi', undefined, 'Edition-specific'),
    codeGeneration: source('Yes', 'https://www.ibm.com/products/engineering-rhapsody', undefined, 'Edition-specific'),
    reverseEngineering: source('Yes', 'https://www.ibm.com/products/engineering-rhapsody', undefined, 'Edition-specific'),
    simulation: source('Yes', 'https://www.ibm.com/products/engineering-rhapsody', undefined, 'Edition-specific'),
    collaboration: source('Yes', 'https://www.ibm.com/products/engineering-rhapsody', undefined, 'External integration'),
    requirementsManagement: source('Yes', 'https://www.ibm.com/products/engineering-rhapsody', 'Requirements capabilities integrate with the IBM Engineering Lifecycle Management family.', 'External integration'),
  },
  erpdesk: {
    xmiImport: source('Yes', 'https://backendside.com/erpdesk.php', 'The official product page describes XMI 2.1 round-trip support.', 'Built-in'),
    xmiExport: source('Yes', 'https://backendside.com/erpdesk.php', 'The official product page describes XMI 2.1 round-trip support.', 'Built-in'),
  },
  'iar-visual-state': {
    codeGeneration: source('Yes', 'https://www.iar.com/products/architect-design-tools/iar-visual-state', 'The official product page describes automatic C/C++ code generation.', 'Built-in'),
  },
  magicdraw: {
    xmiImport: source('Yes', 'https://docs.nomagic.com/spaces/MD2024xR3/pages/227148605/Importing+data+from+other+UML+tools+and+formats'),
    xmiExport: source('Yes', 'https://docs.nomagic.com/spaces/MD2024xR1/pages/169673551/Exporting+UML+models'),
    codeGeneration: source('Yes', 'https://www.3ds.com/products/catia/no-magic/magicdraw', undefined, 'Edition-specific'),
    reverseEngineering: source('Yes', 'https://www.3ds.com/products/catia/no-magic/magicdraw', undefined, 'Edition-specific'),
    collaboration: source('Yes', 'https://www.3ds.com/products/catia/no-magic/magicdraw', undefined, 'External integration'),
    simulation: source('Yes', 'https://www.3ds.com/products/catia/no-magic/magicdraw', 'Available through the No Magic simulation product family.', 'Plugin'),
    requirementsManagement: source('Yes', 'https://www.3ds.com/products/catia/no-magic/magicdraw', undefined, 'Edition-specific'),
  },
  moqups: {
    collaboration: source('Yes', 'https://landing.moqups.com/hc/teams-roles/', 'The official documentation covers team roles and collaborative work.', 'Built-in'),
  },
  modelio: {
    collaboration: source('Yes', 'https://www.modeliosoft.com/en/modules/teamwork-manager.html', 'Collaboration is supplied by the Teamwork Manager module.', 'Plugin'),
  },
  py2puml: {
    reverseEngineering: source('Yes', 'https://github.com/lucsorel/py2puml', 'The CLI and Python API generate PlantUML class diagrams from Python code.', 'Built-in'),
  },
  staruml: {
    xmiImport: source('Yes', 'https://staruml.io/extensions/', 'Requires the XMI extension.', 'Plugin'),
    xmiExport: source('Yes', 'https://staruml.io/extensions/', 'Requires the XMI extension.', 'Plugin'),
    reverseEngineering: source('Yes', 'https://staruml.io/extensions/', 'Requires a language-specific extension.', 'Plugin'),
    codeGeneration: source('Yes', 'https://staruml.io/extensions/', 'Requires a language-specific extension.', 'Plugin'),
    collaboration: source('Unknown', 'https://staruml.io/', 'Current first-party material did not establish a supported team-collaboration workflow.'),
  },
  umodel: {
    xmiImport: source('Yes', 'https://www.altova.com/manual/UModel/UModelenterprise/umxmi_xml_metadata_interchange.html'),
    xmiExport: source('Yes', 'https://www.altova.com/manual/UModel/UModelenterprise/umxmi_xml_metadata_interchange.html'),
    codeGeneration: source('Yes', 'https://www.altova.com/umodel', 'Supports Java, C#, C++, and Visual Basic.', 'Edition-specific'),
    reverseEngineering: source('Yes', 'https://www.altova.com/umodel', 'The official product page describes reverse engineering from source and binaries.', 'Edition-specific'),
  },
  'itemis-create': {
    codeGeneration: source('Yes', 'https://www.itemis.com/en/products/itemis-create/documentation/'),
    simulation: source('Yes', 'https://www.itemis.com/en/products/itemis-create/documentation/'),
    collaboration: source('Yes', 'https://www.itemis.com/en/products/itemis-create/', 'Available in the cloud edition, not every edition.', 'Edition-specific'),
  },
  'ptc-modeler': {
    codeGeneration: source('Yes', 'https://www.omg.org/sysml/sysmlv2/sysml-tool/'),
    simulation: source('Yes', 'https://www.omg.org/sysml/sysmlv2/sysml-tool/'),
  },
  'qp-modeler': {
    codeGeneration: source('Yes', 'https://www.state-machine.com/products/qm', 'QM generates production C and C++ for the QP frameworks.'),
  },
  'sinelabore-rt': {
    xmiImport: source('Yes', 'https://www.sinelabore.de/doku.php', 'The official documentation describes UML/XMI state-machine input.', 'Built-in'),
    xmiExport: source('Yes', 'https://www.sinelabore.de/doku.php', 'The official documentation describes UML/XMI model workflows.', 'Built-in'),
    codeGeneration: source('Yes', 'https://www.sinelabore.de/doku.php', 'The official documentation describes production code generation.', 'Built-in'),
  },
  smartdraw: {
    collaboration: source('Yes', 'https://www.smartdraw.com/', 'The official product page describes team diagram collaboration.', 'Built-in'),
  },
  'su-statemodeler': {
    codeGeneration: source('Yes', 'https://www.christianpauli.de/statemodeler.html', 'The official page describes Java, C#, and C++ generation.', 'Built-in'),
  },
  syson: {
    collaboration: source('Yes', 'https://doc.mbse-syson.org/syson/v2024.11.0/user-manual/faq/faq.html'),
    requirementsManagement: source('Yes', 'https://doc.mbse-syson.org/syson/latest/user-manual/features/requirements.html', 'The official user manual documents requirement modeling and traceability.', 'Built-in'),
  },
  'sysml-v2-pilot': {
    sysmlV2Api: source('Yes', 'https://github.com/Systems-Modeling/SysML-v2-Release', 'Provided by a dedicated API / Services component.', 'Component-specific'),
  },
  'sysml-v2-language-support': {
    requirementsManagement: source('Yes', 'https://marketplace.visualstudio.com/items?itemName=JamieD.sysml-v2-support', 'The extension includes a requirements workbench and traceability matrices.', 'Built-in'),
  },
  statesmith: {
    codeGeneration: source('Yes', 'https://github.com/StateSmith/StateSmith', 'Generates state-machine code from draw.io or PlantUML input.', 'Built-in'),
  },
  umple: {
    codeGeneration: source('Yes', 'https://github.com/umple/umple', 'Generates implementation code from textual Umple models.', 'Built-in'),
    reverseEngineering: source('Yes', 'https://github.com/umple/umple', 'The Umplificator imports structure from existing code.', 'Built-in'),
  },
  sysgit: {
    collaboration: source('Yes', 'https://www.omg.org/sysml/sysmlv2/sysml-tool/', 'The OMG listing describes Git-oriented collaborative SysML v2 workflows.', 'Built-in'),
    requirementsManagement: source('Yes', 'https://www.omg.org/sysml/sysmlv2/sysml-tool/'),
  },
  syside: {
    collaboration: source('Yes', 'https://sensmetry.com/syside/', 'The product page describes real-time collaborative editing and version-control integration.', 'Edition-specific'),
    codeGeneration: source('Yes', 'https://sensmetry.com/syside/', 'Code generation is provided through Syside Automator templates and Python interfaces.', 'Edition-specific'),
    simulation: source('Yes', 'https://sensmetry.com/syside/', 'The paid product family describes model execution, analysis, and behavior simulation.', 'Edition-specific'),
    requirementsManagement: source('Yes', 'https://sensmetry.com/syside/', 'ReqIF exchange and requirement-satisfaction traceability are available in the automation product.', 'Edition-specific'),
    sysmlV2Api: source('Yes', 'https://sensmetry.com/syside/', 'The product page describes integration through SysML v2 APIs.', 'Edition-specific'),
  },
  umbrello: {
    codeGeneration: source('Yes', 'https://apps.kde.org/umbrello/'),
  },
  'papyrus-web': {
    codeGeneration: source('Unknown', 'https://papyrus-web.fr/projects', 'Code generation could not be verified for Papyrus Web itself; desktop Papyrus add-ons are distinct.'),
  },
  'software-ideas-modeler': {
    xmiImport: source('Yes', 'https://www.softwareideas.net/en/edition-comparison', 'Available in Professional and Ultimate editions.', 'Edition-specific'),
    xmiExport: source('Yes', 'https://www.softwareideas.net/en/edition-comparison', 'Available in Professional and Ultimate editions.', 'Edition-specific'),
    codeGeneration: source('Yes', 'https://www.softwareideas.net/en/edition-comparison', 'Availability varies by edition.', 'Edition-specific'),
    reverseEngineering: source('Yes', 'https://www.softwareideas.net/en/edition-comparison', 'Availability varies by edition.', 'Edition-specific'),
    requirementsManagement: source('Yes', 'https://www.softwareideas.net/', 'Scope varies by edition.', 'Edition-specific'),
  },
  'visual-paradigm': {
    xmiImport: source('Yes', 'https://www.visual-paradigm.com/support/edition-comparison.jsp', 'Availability and model coverage vary by edition.', 'Edition-specific'),
    xmiExport: source('Yes', 'https://www.visual-paradigm.com/support/edition-comparison.jsp', 'Availability and model coverage vary by edition.', 'Edition-specific'),
    codeGeneration: source('Yes', 'https://www.visual-paradigm.com/support/edition-comparison.jsp', 'Availability varies by edition.', 'Edition-specific'),
    reverseEngineering: source('Yes', 'https://www.visual-paradigm.com/support/edition-comparison.jsp', 'Availability varies by edition.', 'Edition-specific'),
    simulation: source('Yes', 'https://www.visual-paradigm.com/support/edition-comparison.jsp', 'Verified for business-process simulation; not a general claim for all UML/SysML behavior models.', 'Edition-specific'),
    collaboration: source('Yes', 'https://www.visual-paradigm.com/support/edition-comparison.jsp', 'Team collaboration varies by edition and deployment.', 'Edition-specific'),
    requirementsManagement: source('Yes', 'https://www.visual-paradigm.com/support/edition-comparison.jsp', 'Requirements and traceability availability varies by edition.', 'Edition-specific'),
  },
};

const normalizeDelivery = (value) => ({
  Desktop: 'Desktop Application',
  'Web application': 'Web Application',
  'Editor integration': 'IDE Extension',
  Notebook: 'Notebook Integration',
  'Command line': 'CLI',
}[value] ?? value);

const normalizeRuntime = (value) => ({
  Java: 'JVM',
  Browser: 'Browser JavaScript',
}[value] ?? value);

function sourceLicenseFor(id) {
  if (OPEN_SOURCE_IDS.has(id)) return 'Open Source';
  if (PROPRIETARY_IDS.has(id)) return 'Proprietary';
  if (SOURCE_AVAILABLE_IDS.has(id)) return 'Source Available';
  if (UNKNOWN_LICENSE_IDS.has(id)) return 'Unknown';
  throw new Error(`Missing audited source-license classification for ${id}`);
}

function pricingFor(id) {
  if (id === 'moqups') return ['Free Tier Available'];
  if (id === 'asyst-rendering-modeler' || id === 'syside') return ['Free Tier Available', 'Paid'];
  if (id === 'software-ideas-modeler') return ['Free Tier Available', 'Paid'];
  if (FREE_IDS.has(id)) return ['Free'];
  if (PAID_IDS.has(id)) return ['Paid'];
  if (UNKNOWN_PRICING_IDS.has(id)) return ['Unknown'];
  throw new Error(`Missing audited pricing classification for ${id}`);
}

export function applyAuditOverrides(tool) {
  const auditedEvidence = FEATURE_AUDIT[tool.id] ?? {};
  const features = { ...tool.features };
  for (const [feature, evidence] of Object.entries(auditedEvidence)) {
    features[feature] = evidence.status;
  }

  const baseRuntimes = (tool.runtimes ?? [])
    .filter((value) => !['Native application', 'VS Code', 'Eclipse', 'Jupyter'].includes(value))
    .map(normalizeRuntime);

  return {
    ...tool,
    ...(PRODUCT_OVERRIDES[tool.id] ?? {}),
    operatingSystems: OS_OVERRIDES[tool.id] ?? tool.operatingSystems,
    deliveryModes: DELIVERY_OVERRIDES[tool.id] ?? (tool.deliveryModes ?? []).map(normalizeDelivery),
    runtimes: RUNTIME_OVERRIDES[tool.id] ?? baseRuntimes,
    hostApplications: HOST_OVERRIDES[tool.id] ?? [],
    sourceLicense: sourceLicenseFor(tool.id),
    ...(SPDX_LICENSES[tool.id] ? { spdxLicenseId: SPDX_LICENSES[tool.id] } : {}),
    pricingModels: pricingFor(tool.id),
    licenseTerms: OPEN_SOURCE_IDS.has(tool.id) || ['bouml', 'qp-modeler'].includes(tool.id)
      ? ['Perpetual']
      : tool.id === 'syside' ? ['Subscription'] : ['Unknown'],
    commercialUseAllowed: OPEN_SOURCE_IDS.has(tool.id) || tool.id === 'bouml' ? true : 'Unknown',
    features,
    featureEvidence: auditedEvidence,
    classificationNotes: CLASSIFICATION_NOTES[tool.id] ?? [],
    classificationReviewedAt: REVIEWED_AT,
    lastChecked: REVIEWED_AT,
  };
}
