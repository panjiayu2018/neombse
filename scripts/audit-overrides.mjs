const REVIEWED_AT = '2026-10-23';
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
  edrawmax: ['Web Application', 'Desktop Application'],
  gojs: ['Library / SDK'],
  mermaid: ['Library / SDK'],
  'itemis-create': ['Desktop Application', 'IDE Extension', 'Web Application'],
  kuml: ['Web Application', 'Desktop Application'],
  'omnigraffle-ios': ['Mobile Application'],
  plantuml: ['CLI', 'IDE Extension', 'Library / SDK', 'API Service'],
  'state-machine-cat': ['CLI', 'Web Application', 'Library / SDK'],
  syside: ['IDE Extension', 'Desktop Application'],
  'sysml-v2-pilot': ['IDE Extension', 'Notebook Integration', 'CLI', 'Desktop Application'],
  umlet: ['Desktop Application', 'IDE Extension'],
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
  kuml: ['Browser JavaScript'],
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
  syson: ['Browser JavaScript'],
  umlet: ['JVM'],
  umple: ['Browser JavaScript'],
  'visual-paradigm': ['JVM'],
  'yed-graph-editor': ['JVM'],
};

const HOST_OVERRIDES = {
  'asyst-rendering-modeler': ['VS Code'],
  'eclipse-papyrus': ['Eclipse'],
  'itemis-create': ['Eclipse', 'VS Code'],
  'lsp-uml': ['VS Code'],
  syside: ['VS Code'],
  'sysml-v2-pilot': ['Eclipse', 'JupyterLab'],
  'sysml-v2-studio': ['VS Code'],
  'sysml-v2-language-support': ['VS Code'],
  umbrello: ['Qt / KDE'],
  umlet: ['Eclipse', 'VS Code'],
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
  'astah-professional', 'catia-magic-cameo-sysml-v2', 'conceptdraw-diagram',
  'easy-uml-editor', 'edrawmax', 'enterprise-architect', 'erpdesk', 'gojs',
  'iar-visual-state', 'ibm-rhapsody', 'ibm-rhapsody-systems-engineering',
  'itemis-create', 'magicdraw', 'moqups', 'next-design', 'omnigraffle-ios',
  'omnigraffle-mac', 'ptc-modeler', 'rational-software-architect-designer',
  'sinelabore-rt', 'smartdraw', 'software-ideas-modeler', 'staruml',
  'sysgit', 'uml-diagrammer', 'umodel', 'visual-paradigm', 'yed-graph-editor',
]);

const UNKNOWN_LICENSE_IDS = new Set([
  'asyst-rendering-modeler', 'bouml', 'qp-modeler', 'runway', 'su-statemodeler',
  'syside', 'trufun-modeling-platform',
]);

const FREE_IDS = new Set([
  ...OPEN_SOURCE_IDS,
  'asyst-rendering-modeler', 'qp-modeler', 'su-statemodeler', 'yed-graph-editor',
]);

const PAID_IDS = new Set([...PROPRIETARY_IDS].filter((id) => ![
  'moqups', 'software-ideas-modeler', 'yed-graph-editor',
].includes(id)));

const UNKNOWN_PRICING_IDS = new Set([
  'bouml', 'runway', 'syside', 'trufun-modeling-platform',
]);

const CLASSIFICATION_NOTES = {
  'astah-professional': ['The desktop product supports Windows, macOS, and Linux; JVM is a runtime, not an operating system.'],
  'catia-magic-cameo-sysml-v2': ['Capabilities vary across the CATIA Magic, Cameo, and SysML v2 product family; do not assume every edition includes every feature.'],
  'clang-uml': ['Reverse engineering means converting C/C++ AST data into PlantUML, Mermaid, or JSON diagrams.'],
  gojs: ['GoJS is a JavaScript diagramming library / SDK, not a ready-to-use UML modeling application.'],
  'itemis-create': ['The product family includes Eclipse desktop, VS Code, and browser editions; capabilities can vary by edition.'],
  mermaid: ['This record covers the MIT-licensed Mermaid renderer. Mermaid Chart is a separate commercial service.'],
  'papyrus-web': ['Desktop Eclipse Papyrus extensions do not automatically establish equivalent Papyrus Web capabilities.'],
  plantuml: ['Graphviz may be required for some diagram types.'],
  py2puml: ['Reverse engineering means converting Python code to UML notation, not creating an XMI semantic model repository.'],
  'software-ideas-modeler': ['XMI import and export require Professional or Ultimate editions; other capabilities also vary by edition.'],
  staruml: ['XMI, reverse engineering, and code generation can require separately installed extensions.'],
  'state-machine-cat': ['Diagram rendering and SCXML transformation are not counted as target-language code generation.'],
  'sysml-v2-pilot': ['The editor, notebook, and API Services are separable components of the pilot release.'],
  syson: ['A product-specific GraphQL API is not equivalent to the standard SysML v2 API; standard API support remains Unknown.'],
  umlet: ['UMLetino is a separate web edition; this record covers UMLet desktop and its IDE extensions.'],
  'visual-paradigm': ['The verified simulation claim is for business-process simulation and should not be read as arbitrary UML/SysML behavior execution.'],
  'yed-graph-editor': ['yEd is proprietary freeware available for Windows, macOS, and Linux.'],
};

const PRODUCT_OVERRIDES = {
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
  'sysml-v2-studio': {
    name: 'SysML v2 Studio for VS Code',
  },
  umbrello: {
    latestVersion: '26.08.2',
    releaseDate: '2026-10-08',
    description: 'An open-source UML modeling application from the KDE ecosystem with source-code generation and distributions for Linux and Windows.',
  },
  'yed-graph-editor': {
    website: 'https://www.yworks.com/products/yed',
    sources: [{ label: 'Official yEd product page', url: 'https://www.yworks.com/products/yed' }],
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
  'enterprise-architect': {
    xmiImport: source('Yes', 'https://imap.sparxsystems.com/enterprise_architect_user_guide/17.2/model_exchange/importexport.html'),
    xmiExport: source('Yes', 'https://imap.sparxsystems.com/enterprise_architect_user_guide/17.2/model_exchange/importexport.html'),
    codeGeneration: source('Yes', 'https://news.sparxsystems.com/enterprise_architect_user_guide/17.2/modeling_domains/software_getting_started.html'),
    reverseEngineering: source('Yes', 'https://news.sparxsystems.com/enterprise_architect_user_guide/17.2/modeling_domains/software_getting_started.html'),
  },
  'astah-professional': {
    xmiImport: source('Yes', 'https://astah.net/products/plugins-integrations/', 'Requires the XMI extension; supported versions and diagram fidelity are limited.', 'Plugin'),
    xmiExport: source('Yes', 'https://astah.net/products/plugins-integrations/', 'Requires the XMI extension; supported versions and diagram fidelity are limited.', 'Plugin'),
    codeGeneration: source('Yes', 'https://astah.net/products/astah-professional/'),
    reverseEngineering: source('Yes', 'https://astah.net/products/astah-professional/'),
    requirementsManagement: source('Yes', 'https://astah.net/products/compare-editions/', 'Model-level requirements and traceability; not necessarily enterprise requirements management.', 'Edition-specific'),
  },
  'ibm-rhapsody': {
    xmiImport: source('Yes', 'https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/design-rhapsody/10.0.3?topic=tools-exchanging-model-data-by-using-xmi', undefined, 'Edition-specific'),
    xmiExport: source('Yes', 'https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/design-rhapsody/10.0.3?topic=tools-exchanging-model-data-by-using-xmi', undefined, 'Edition-specific'),
    simulation: source('Yes', 'https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/design-rhapsody/10.0.3?topic=tools-exchanging-model-data-by-using-xmi', undefined, 'Edition-specific'),
  },
  magicdraw: {
    xmiImport: source('Yes', 'https://docs.nomagic.com/spaces/MD2024xR3/pages/227148605/Importing+data+from+other+UML+tools+and+formats'),
    xmiExport: source('Yes', 'https://docs.nomagic.com/spaces/MD2024xR1/pages/169673551/Exporting+UML+models'),
  },
  staruml: {
    xmiImport: source('Yes', 'https://staruml.io/extensions/', 'Requires the XMI extension.', 'Plugin'),
    xmiExport: source('Yes', 'https://staruml.io/extensions/', 'Requires the XMI extension.', 'Plugin'),
    reverseEngineering: source('Yes', 'https://staruml.io/extensions/', 'Requires a language-specific extension.', 'Plugin'),
    codeGeneration: source('Yes', 'https://staruml.io/extensions/', 'Requires a language-specific extension.', 'Plugin'),
  },
  umodel: {
    xmiImport: source('Yes', 'https://www.altova.com/manual/UModel/UModelenterprise/umxmi_xml_metadata_interchange.html'),
    xmiExport: source('Yes', 'https://www.altova.com/manual/UModel/UModelenterprise/umxmi_xml_metadata_interchange.html'),
    codeGeneration: source('Yes', 'https://www.altova.com/umodel', 'Supports Java, C#, C++, and Visual Basic.', 'Edition-specific'),
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
  syson: {
    collaboration: source('Yes', 'https://doc.mbse-syson.org/syson/v2024.11.0/user-manual/faq/faq.html'),
  },
  'sysml-v2-pilot': {
    sysmlV2Api: source('Yes', 'https://github.com/Systems-Modeling/SysML-v2-Release', 'Provided by a dedicated API / Services component.', 'Component-specific'),
  },
  sysgit: {
    requirementsManagement: source('Yes', 'https://www.omg.org/sysml/sysmlv2/sysml-tool/'),
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
  if (UNKNOWN_LICENSE_IDS.has(id)) return 'Unknown';
  throw new Error(`Missing audited source-license classification for ${id}`);
}

function pricingFor(id) {
  if (id === 'moqups') return ['Free Tier Available'];
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
    pricingModels: pricingFor(tool.id),
    licenseTerms: ['Unknown'],
    features,
    featureEvidence: auditedEvidence,
    classificationNotes: CLASSIFICATION_NOTES[tool.id] ?? [],
    classificationReviewedAt: REVIEWED_AT,
    lastChecked: REVIEWED_AT,
  };
}
