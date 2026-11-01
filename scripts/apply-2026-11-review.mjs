import { readFile, writeFile } from 'node:fs/promises';

const CHECKED_AT = '2026-11-01';
const directory = new URL('../src/data/tools/', import.meta.url);
const featureNames = [
  'xmiImport', 'xmiExport', 'collaboration', 'codeGeneration',
  'reverseEngineering', 'simulation', 'requirementsManagement', 'sysmlV2Api',
];

const evidence = (url, note, availability = 'Built-in') => ({
  status: 'Yes', url, checkedAt: CHECKED_AT, availability, ...(note ? { note } : {}),
});

function tool(input) {
  const featureEvidence = input.featureEvidence ?? {};
  return {
    id: input.id,
    name: input.name,
    vendor: input.vendor,
    website: input.website,
    description: input.description,
    editorialNote: 'Added after the 2026-11-01 coverage review. Capabilities are marked Yes only where a current first-party or standards-body source was found.',
    operatingSystems: input.operatingSystems ?? [],
    deliveryModes: input.deliveryModes,
    runtimes: input.runtimes ?? [],
    hostApplications: input.hostApplications ?? [],
    standards: input.standards,
    toolTypes: input.toolTypes,
    sourceLicense: input.sourceLicense,
    ...(input.spdxLicenseId ? { spdxLicenseId: input.spdxLicenseId } : {}),
    pricingModels: input.pricingModels,
    licenseTerms: input.licenseTerms,
    trialAvailable: input.trialAvailable ?? 'Unknown',
    commercialUseAllowed: input.commercialUseAllowed ?? 'Unknown',
    modelingModes: input.modelingModes,
    features: Object.fromEntries(featureNames.map((name) => [name, featureEvidence[name] ? 'Yes' : input.features?.[name] ?? 'Unknown'])),
    featureEvidence,
    classificationNotes: input.classificationNotes ?? [],
    classificationReviewedAt: CHECKED_AT,
    latestVersion: input.latestVersion ?? null,
    releaseDate: input.releaseDate ?? null,
    lastChecked: CHECKED_AT,
    sourceCollection: 'NeoMBSE coverage audit',
    sources: input.sources,
    featured: false,
  };
}

const omgTools = 'https://www.omg.org/sysml/sysmlv2/sysml-tool/';

const additions = [
  tool({
    id: 'sysand', name: 'Sysand', vendor: 'Sensmetry', website: 'https://sysand.com/',
    description: 'An open-source package manager and CLI/API toolkit for reusable SysML v2 and KerML model libraries.',
    deliveryModes: ['CLI', 'Library / SDK'], runtimes: ['Native', 'Python', 'JVM'],
    standards: ['SysML v2', 'KerML'], toolTypes: ['Package manager', 'Library / SDK'],
    sourceLicense: 'Open Source', pricingModels: ['Free'], licenseTerms: ['Perpetual'],
    commercialUseAllowed: true, modelingModes: ['Textual'],
    classificationNotes: ['Sysand is model-library infrastructure rather than a graphical model editor. The repository offers dual MIT or Apache-2.0 licensing, so no single SPDX identifier is shown.'],
    sources: [
      { label: 'Official Sysand site', url: 'https://sysand.com/' },
      { label: 'Official source repository', url: 'https://github.com/sensmetry/sysand' },
    ],
  }),
  tool({
    id: 'mgnite-mg', name: 'Mgnite Mg', vendor: 'Mgnite', website: 'https://www.mgnite.com/mg/',
    description: 'A SysML v2 modeling environment with browser and Jupyter workflows, Python integration, Git-oriented collaboration, and engineering-tool connectors.',
    deliveryModes: ['Web Application', 'Notebook Integration', 'Library / SDK'], runtimes: ['Browser JavaScript', 'Python'], hostApplications: ['JupyterLab'],
    standards: ['SysML v2'], toolTypes: ['Model editor', 'Integration platform'], sourceLicense: 'Proprietary',
    pricingModels: ['Free Tier Available'], licenseTerms: ['Usage-based'], modelingModes: ['Graphical', 'Textual'],
    featureEvidence: {
      collaboration: evidence('https://www.mgnite.com/mg/', 'The product page describes Git-based model collaboration.'),
      simulation: evidence('https://www.mgnite.com/mg/', 'Simulation is provided through engineering-tool integrations such as Simulink.', 'External integration'),
      requirementsManagement: evidence('https://www.mgnite.com/mg/', 'Requirements traceability is provided through connectors including DOORS Next.', 'External integration'),
      sysmlV2Api: evidence('https://www.mgnite.com/mg/', 'The product page identifies support for the standard SysML v2 API.'),
    },
    sources: [{ label: 'Official Mgnite Mg product page', url: 'https://www.mgnite.com/mg/' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'systemsmodeling-com', name: 'SystemsModeling.com', vendor: 'SystemsModeling.com', website: 'https://systemsmodeling.com/',
    description: 'A public preview web environment for creating, loading, validating, and visualizing SysML v2 models in a shared repository.',
    deliveryModes: ['Web Application', 'API Service'], runtimes: ['Browser JavaScript'], standards: ['SysML v2'],
    toolTypes: ['Model editor', 'Model repository'], sourceLicense: 'Unknown', pricingModels: ['Unknown'], licenseTerms: ['Unknown'],
    modelingModes: ['Graphical', 'Textual'],
    featureEvidence: { sysmlV2Api: evidence('https://systemsmodeling.com/', 'The preview describes a Flexo repository implementing the standard Systems Modeling API.', 'Component-specific') },
    classificationNotes: ['The vendor labels this service a preview and warns that it is not final or secure; do not upload proprietary models.'],
    sources: [{ label: 'Official preview site', url: 'https://systemsmodeling.com/' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'simcenter-studio', name: 'Simcenter Studio', vendor: 'Siemens', website: 'https://www.siemens.com/en-gb/products/simcenter/integration-solutions/studio/',
    description: 'A system architecture exploration environment that combines SysML v2 textual input, Python-driven analysis, simulation workflows, and engineering integrations.',
    deliveryModes: ['Desktop Application'], runtimes: ['Python'], standards: ['SysML v2'], toolTypes: ['Architecture analysis', 'Simulation environment'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Graphical', 'Textual'],
    featureEvidence: { simulation: evidence('https://blogs.sw.siemens.com/simcenter/product/simcenter-studio/', 'The official product announcement describes architecture exploration, simulation, and analysis workflows.') },
    sources: [{ label: 'Official Simcenter Studio page', url: 'https://www.siemens.com/en-gb/products/simcenter/integration-solutions/studio/' }, { label: 'Official Siemens product article', url: 'https://blogs.sw.siemens.com/simcenter/product/simcenter-studio/' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'qualtech-teams', name: 'TEAMS Toolset', vendor: 'Qualtech Systems', website: 'https://www.teamqsi.com/products/',
    description: 'A reliability, safety, testability, and diagnostic-analysis toolset that can consume SysML v2 textual models for FMECA, fault-tree, and related analyses.',
    operatingSystems: ['Windows'], deliveryModes: ['Desktop Application'], standards: ['SysML v2'], toolTypes: ['Safety and reliability analysis'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Graphical', 'Textual'],
    featureEvidence: { simulation: evidence(omgTools, 'The OMG listing describes fault simulation and safety/diagnostic analyses from SysML v2 textual input.', 'External integration') },
    classificationNotes: ['TEAMS is classified as an analysis consumer, not a general-purpose SysML v2 authoring environment.'],
    sources: [{ label: 'Official Qualtech products page', url: 'https://www.teamqsi.com/products/' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'violet-labs', name: 'Violet', vendor: 'Violet Labs', website: 'https://www.violetlabs.com/',
    description: 'A digital-thread integration platform listed by OMG for SysML v2 integration across engineering repositories and lifecycle systems.',
    deliveryModes: ['Web Application', 'API Service'], runtimes: ['Browser JavaScript'], standards: ['SysML v2'], toolTypes: ['Integration platform'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Not applicable'],
    classificationNotes: ['Violet is a connector and digital-thread platform, not a SysML diagram editor; model-authoring capabilities remain Unknown.'],
    sources: [{ label: 'Official Violet Labs site', url: 'https://www.violetlabs.com/' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'ellidiss-sysml-v2', name: 'Ellidiss SysML v2', vendor: 'Ellidiss Technologies', website: 'https://github.com/Ellidiss/sysml-ellidiss',
    description: 'A free VS Code extension for SysML v2 textual parsing, navigation, diagnostics, and editing based on a published SysML v2 release.',
    deliveryModes: ['IDE Extension'], hostApplications: ['VS Code'], standards: ['SysML v2'], toolTypes: ['Text editor extension'],
    sourceLicense: 'Unknown', pricingModels: ['Free'], licenseTerms: ['Unknown'], modelingModes: ['Textual'],
    classificationNotes: ['The public repository does not currently publish a recognized software-license file, so it is not classified as Open Source.'],
    sources: [{ label: 'Official extension repository', url: 'https://github.com/Ellidiss/sysml-ellidiss' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'lucidchart', name: 'Lucidchart', vendor: 'Lucid Software', website: 'https://lucid.co/diagram/uml',
    description: 'A browser-based collaborative diagramming product with UML shape libraries, templates, and text-to-sequence-diagram notation.',
    deliveryModes: ['Web Application'], runtimes: ['Browser JavaScript'], standards: ['UML'], toolTypes: ['Diagramming tool'],
    sourceLicense: 'Proprietary', pricingModels: ['Free Tier Available', 'Paid'], licenseTerms: ['Subscription'], trialAvailable: true,
    modelingModes: ['Graphical', 'Textual'],
    featureEvidence: { collaboration: evidence('https://lucid.co/diagram/uml', 'The official UML page describes real-time team collaboration.') },
    classificationNotes: ['This is a UML diagramming product; semantic repository, XMI, and SysML capabilities remain unverified.'],
    sources: [{ label: 'Official Lucid UML page', url: 'https://lucid.co/diagram/uml' }],
  }),
  tool({
    id: 'creately', name: 'Creately', vendor: 'Creately', website: 'https://creately.com/lp/uml-diagram-tool/',
    description: 'A browser-based collaborative diagramming product with UML templates and shape libraries.',
    deliveryModes: ['Web Application'], runtimes: ['Browser JavaScript'], standards: ['UML'], toolTypes: ['Diagramming tool'],
    sourceLicense: 'Proprietary', pricingModels: ['Free Tier Available', 'Paid'], licenseTerms: ['Subscription'], trialAvailable: true,
    modelingModes: ['Graphical'],
    featureEvidence: { collaboration: evidence('https://creately.com/lp/uml-diagram-tool/', 'The official UML page describes real-time collaborative editing.') },
    classificationNotes: ['No current first-party evidence for SysML support was found, so the record is limited to UML diagramming.'],
    sources: [{ label: 'Official Creately UML page', url: 'https://creately.com/lp/uml-diagram-tool/' }],
  }),
  tool({
    id: 'trechoro', name: 'Trechoro', vendor: 'Sparx Systems', website: 'https://sparxsystems.com/mbse/sysml2/',
    description: 'A native KerML and SysML v2 modeling environment announced by Sparx Systems with graphical and textual model views.',
    operatingSystems: ['Windows'], deliveryModes: ['Desktop Application'], standards: ['SysML v2', 'KerML'], toolTypes: ['Model editor'],
    sourceLicense: 'Proprietary', pricingModels: ['Unknown'], licenseTerms: ['Unknown'], modelingModes: ['Graphical', 'Textual'],
    classificationNotes: ['The official page presents behavior execution and simulation as roadmap work, so simulation is not marked Yes. Public version and licensing details were not established.'],
    sources: [{ label: 'Official Trechoro product page', url: 'https://sparxsystems.com/mbse/sysml2/' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'mathworks-system-composer', name: 'System Composer', vendor: 'MathWorks', website: 'https://www.mathworks.com/products/sysml.html',
    description: 'A MATLAB-based system architecture product with SysML v2 import/export, repository connectivity, architecture analysis, and simulation workflows.',
    operatingSystems: ['Windows', 'macOS', 'Linux'], deliveryModes: ['Desktop Application'], runtimes: ['MATLAB'], hostApplications: ['MATLAB'],
    standards: ['SysML v1', 'SysML v2'], toolTypes: ['Model editor', 'Architecture analysis'], sourceLicense: 'Proprietary',
    pricingModels: ['Paid'], licenseTerms: ['Perpetual', 'Subscription'], modelingModes: ['Graphical', 'Textual'],
    featureEvidence: {
      simulation: evidence('https://www.mathworks.com/products/sysml.html', 'The official product page describes architecture simulation and analysis.'),
      sysmlV2Api: evidence('https://www.mathworks.com/help/systemcomposer/ug/connect-to-sysml-repository.html', 'System Composer can connect to a SysML v2 repository through the standard repository workflow.', 'Component-specific'),
    },
    sources: [{ label: 'Official MathWorks SysML page', url: 'https://www.mathworks.com/products/sysml.html' }, { label: 'Official repository connection documentation', url: 'https://www.mathworks.com/help/systemcomposer/ug/connect-to-sysml-repository.html' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'lemontree', name: 'LemonTree', vendor: 'LieberLieber', website: 'https://www.lieberlieber.com/en/lieberlieber-lemontree-for-sysmlv2/',
    description: 'A model differencing and merging product for Enterprise Architect repositories, with preview support for native SysML v2 repositories.',
    operatingSystems: ['Windows'], deliveryModes: ['Desktop Application', 'CLI'], standards: ['UML', 'SysML v1', 'SysML v2'], toolTypes: ['Model diff and merge'],
    sourceLicense: 'Proprietary', pricingModels: ['Paid'], licenseTerms: ['Unknown'], modelingModes: ['Graphical', 'Textual'],
    latestVersion: '5.0.1', releaseDate: '2026-09-16',
    classificationNotes: ['SysML v2 support is explicitly labeled Preview in the 5.0 release documentation. The current system requirements list Windows, not Linux.'],
    sources: [{ label: 'Official LemonTree for SysML v2 page', url: 'https://www.lieberlieber.com/en/lieberlieber-lemontree-for-sysmlv2/' }, { label: 'Official 5.0 release notes', url: 'https://help.lieberlieber.com/lemontree/Release-5.0.x.html' }, { label: 'Official system requirements', url: 'https://help.lieberlieber.com/LemonTree/System-Requirements.html' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'secollab', name: 'SECollab', vendor: 'SodiusWillert', website: 'https://www.sodiuswillert.com/en/products/secollab',
    description: 'A web platform for collaborative review and traceability across requirements, models, tests, and engineering repositories.',
    deliveryModes: ['Web Application'], runtimes: ['Browser JavaScript'], standards: ['UML', 'SysML v1', 'SysML v2'], toolTypes: ['Model review', 'Collaboration platform'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Subscription'], modelingModes: ['Graphical'],
    featureEvidence: {
      collaboration: evidence('https://www.sodiuswillert.com/en/products/secollab', 'The product is designed for browser-based model and document review.'),
      requirementsManagement: evidence('https://www.sodiuswillert.com/en/products/secollab', 'The official page describes traceability and review across requirements, models, and tests.', 'External integration'),
    },
    classificationNotes: ['SECollab reviews and connects models; it is not classified as a general-purpose SysML authoring tool.'],
    sources: [{ label: 'Official SECollab product page', url: 'https://www.sodiuswillert.com/en/products/secollab' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'sbe-vision', name: 'SBE Vision', vendor: 'SBE Vision', website: 'https://www.sbe-vision.com/',
    description: 'A web-based systems-engineering digital-thread platform listed by OMG among SysML v2 tools and integrations.',
    deliveryModes: ['Web Application', 'API Service'], runtimes: ['Browser JavaScript'], standards: ['SysML v2'], toolTypes: ['Integration platform'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Graphical'],
    classificationNotes: ['The OMG list establishes SysML v2 relevance, but detailed exchange and authoring capabilities remain Unknown.'],
    sources: [{ label: 'Official SBE Vision site', url: 'https://www.sbe-vision.com/' }, { label: 'OMG SysML v2 tools list', url: omgTools }],
  }),
  tool({
    id: 'ansys-medini-analyze', name: 'Ansys medini analyze', vendor: 'Ansys', website: 'https://ansys.synopsys.com/products/safety-analysis/ansys-medini-analyze',
    description: 'A model-based safety and reliability analysis environment with hybrid SysML v1/v2 workflows, traceability, and team collaboration.',
    operatingSystems: ['Windows'], deliveryModes: ['Desktop Application'], standards: ['SysML v1', 'SysML v2'], toolTypes: ['Safety and reliability analysis'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Graphical'],
    featureEvidence: {
      collaboration: evidence('https://ansys.synopsys.com/products/safety-analysis/ansys-medini-analyze', 'The official page describes team-oriented safety-analysis workflows.'),
      requirementsManagement: evidence('https://ansys.synopsys.com/products/safety-analysis/ansys-medini-analyze', 'The official page describes requirements traceability and lifecycle integration.', 'External integration'),
    },
    classificationNotes: ['The reviewed documentation did not establish direct XMI import/export; external SysML exchange is not treated as XMI evidence.'],
    sources: [{ label: 'Official Ansys medini analyze page', url: 'https://ansys.synopsys.com/products/safety-analysis/ansys-medini-analyze' }],
  }),
  tool({
    id: 'capella-for-syson', name: 'Capella for SysON', vendor: 'Eclipse Capella community', website: 'https://github.com/eclipse-capella/capella-for-syson',
    description: 'An open-source web implementation that brings the Capella/Arcadia method onto SysON, Sirius Web, and SysML v2 technologies.',
    deliveryModes: ['Web Application'], runtimes: ['JVM', 'Browser JavaScript'], standards: ['SysML v2', 'Arcadia'], toolTypes: ['Model editor'],
    sourceLicense: 'Open Source', spdxLicenseId: 'EPL-2.0', pricingModels: ['Free'], licenseTerms: ['Perpetual'], commercialUseAllowed: true,
    modelingModes: ['Graphical', 'Textual'],
    classificationNotes: ['This record covers the SysON-based implementation; standalone Eclipse Capella remains outside the main UML/SysML directory because Arcadia is a distinct language and method.'],
    sources: [{ label: 'Official Eclipse Capella repository', url: 'https://github.com/eclipse-capella/capella-for-syson' }],
  }),
  tool({
    id: 'syster', name: 'Syster', vendor: 'Jade Codes', website: 'https://github.com/jade-codes/syster',
    description: 'An alpha-stage open-source SysML v2 toolkit with a Rust parser and CLI, Python bindings, language-server support, and a VS Code model viewer.',
    operatingSystems: ['Windows', 'macOS', 'Linux'], deliveryModes: ['CLI', 'IDE Extension', 'Library / SDK'], runtimes: ['Native', 'Python'], hostApplications: ['VS Code'],
    standards: ['SysML v2', 'KerML'], toolTypes: ['Parser', 'Model editor', 'Library / SDK'], sourceLicense: 'Open Source', spdxLicenseId: 'MIT',
    pricingModels: ['Free'], licenseTerms: ['Perpetual'], commercialUseAllowed: true, modelingModes: ['Graphical', 'Textual'],
    featureEvidence: { xmiExport: evidence('https://github.com/jade-codes/syster', 'The repository documents an export-xmi command; the project is alpha-stage.') },
    classificationNotes: ['The project describes itself as alpha and under active development; the XMI export should not be assumed production-stable.'],
    sources: [{ label: 'Official Syster repository', url: 'https://github.com/jade-codes/syster' }],
  }),
  tool({
    id: 'cameo-systems-modeler', name: 'Cameo Systems Modeler', vendor: 'Dassault Systèmes', website: 'https://www.3ds.com/products/catia/no-magic/cameo-systems-modeler',
    description: 'A commercial systems-modeling product built on the MagicDraw platform for SysML architectures, requirements traceability, collaboration, and simulation extensions.',
    operatingSystems: ['Windows', 'macOS', 'Linux'], deliveryModes: ['Desktop Application'], runtimes: ['JVM'], standards: ['UML', 'SysML v1'], toolTypes: ['Model editor'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Graphical', 'Textual'],
    featureEvidence: {
      xmiImport: evidence('https://www.3ds.com/products/catia/no-magic/cameo-systems-modeler', 'The product page describes XMI-based interoperability.'),
      xmiExport: evidence('https://www.3ds.com/products/catia/no-magic/cameo-systems-modeler', 'The product page describes XMI-based interoperability.'),
      collaboration: evidence('https://www.3ds.com/products/catia/no-magic/cameo-systems-modeler', 'Teamwork capabilities are provided through the No Magic product family.', 'External integration'),
      simulation: evidence('https://www.3ds.com/products/catia/no-magic/cameo-systems-modeler', 'Execution and simulation require the relevant No Magic simulation product.', 'Plugin'),
      requirementsManagement: evidence('https://www.3ds.com/products/catia/no-magic/cameo-systems-modeler', 'The official page describes requirements traceability.', 'Built-in'),
    },
    classificationNotes: ['Cameo Systems Modeler is a distinct systems-engineering SKU; capabilities and add-ons vary by edition and license.'],
    sources: [{ label: 'Official Cameo Systems Modeler page', url: 'https://www.3ds.com/products/catia/no-magic/cameo-systems-modeler' }],
  }),
  tool({
    id: 'innoslate', name: 'Innoslate', vendor: 'SPEC Innovations', website: 'https://specinnovations.com/innoslate',
    description: 'A cloud systems-engineering platform with SysML-oriented diagrams, requirements traceability, team collaboration, analysis, and simulation.',
    deliveryModes: ['Web Application'], runtimes: ['Browser JavaScript'], standards: ['SysML v1'], toolTypes: ['Model editor', 'Lifecycle platform'],
    sourceLicense: 'Proprietary', pricingModels: ['Free Tier Available', 'Paid'], licenseTerms: ['Subscription'], trialAvailable: true, modelingModes: ['Graphical'],
    featureEvidence: {
      collaboration: evidence('https://specinnovations.com/innoslate', 'The product page describes cloud team collaboration.'),
      simulation: evidence('https://specinnovations.com/innoslate', 'The product page describes simulation and analysis.'),
      requirementsManagement: evidence('https://specinnovations.com/innoslate', 'The product page describes requirements management and traceability.'),
    },
    sources: [{ label: 'Official Innoslate product page', url: 'https://specinnovations.com/innoslate' }, { label: 'Official diagram documentation', url: 'https://help.specinnovations.com/diagrams-overview-in-innoslate' }],
  }),
  tool({
    id: 'genesys', name: 'GENESYS', vendor: 'Vitech', website: 'https://www.vitechcorp.com/genesys/',
    description: 'A desktop systems-engineering environment for architecture modeling, requirements traceability, team repositories, analysis, and executable behavior.',
    operatingSystems: ['Windows'], deliveryModes: ['Desktop Application'], standards: ['SysML v1'], toolTypes: ['Model editor', 'Systems engineering platform'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Graphical'],
    featureEvidence: {
      collaboration: evidence('https://genesys-help.vitechcorp.com/genesys-help/genesys-product-family', 'The product family documentation describes shared repositories and team deployment.', 'Edition-specific'),
      simulation: evidence('https://genesys-help.vitechcorp.com/genesys-help/genesys-product-family', 'The documentation describes behavior execution and analysis.', 'Edition-specific'),
      requirementsManagement: evidence('https://genesys-help.vitechcorp.com/genesys-help/genesys-product-family', 'Requirements and traceability are core product capabilities.', 'Built-in'),
    },
    sources: [{ label: 'Official GENESYS product-family help', url: 'https://genesys-help.vitechcorp.com/genesys-help/genesys-product-family' }],
  }),
  tool({
    id: 'siemens-system-modeling-workbench', name: 'System Modeling Workbench', vendor: 'Siemens', website: 'https://www.siemens.com/en-gb/solutions/systems-engineering/',
    description: 'A Teamcenter-integrated SysML workbench for system architecture, requirements links, multi-user collaboration, and lifecycle traceability.',
    deliveryModes: ['Desktop Application'], hostApplications: ['Teamcenter'], standards: ['UML', 'SysML v1'], toolTypes: ['Model editor', 'Lifecycle integration'],
    sourceLicense: 'Proprietary', pricingModels: ['Custom Quote'], licenseTerms: ['Unknown'], modelingModes: ['Graphical'],
    featureEvidence: {
      collaboration: evidence('https://www.plm.automation.siemens.com/media/global/cz/Siemens%20SW%20System%20Modeling%20Workbench%20for%20Teamcenter%20%20Fact%20Sheet_tcm84-75918.pdf', 'The official fact sheet describes multi-user Teamcenter collaboration.', 'External integration'),
      requirementsManagement: evidence('https://www.plm.automation.siemens.com/media/global/cz/Siemens%20SW%20System%20Modeling%20Workbench%20for%20Teamcenter%20%20Fact%20Sheet_tcm84-75918.pdf', 'The official fact sheet describes requirement links and traceability.', 'External integration'),
    },
    sources: [{ label: 'Official Siemens systems-engineering page', url: 'https://www.siemens.com/en-gb/solutions/systems-engineering/' }, { label: 'Official product fact sheet', url: 'https://www.plm.automation.siemens.com/media/global/cz/Siemens%20SW%20System%20Modeling%20Workbench%20for%20Teamcenter%20%20Fact%20Sheet_tcm84-75918.pdf' }],
  }),
  tool({
    id: 'whitestaruml', name: 'WhiteStarUML', vendor: 'WhiteStarUML project', website: 'https://sourceforge.net/projects/whitestaruml/',
    description: 'A legacy Windows UML editor forked from StarUML 5, with source-code generation and reverse-engineering features.',
    operatingSystems: ['Windows'], deliveryModes: ['Desktop Application'], runtimes: ['Native'], standards: ['UML'], toolTypes: ['Model editor'],
    sourceLicense: 'Open Source', spdxLicenseId: 'GPL-2.0-only', pricingModels: ['Free'], licenseTerms: ['Perpetual'], commercialUseAllowed: true, modelingModes: ['Graphical'],
    featureEvidence: {
      codeGeneration: evidence('https://sourceforge.net/projects/whitestaruml/', 'The official project description lists code generation.'),
      reverseEngineering: evidence('https://sourceforge.net/projects/whitestaruml/', 'The official project description lists reverse engineering.'),
    },
    releaseDate: '2018-03-25',
    classificationNotes: ['SourceForge marks the project Abandoned; the date shown is the last project update, not a current release.'],
    sources: [{ label: 'Official SourceForge project page', url: 'https://sourceforge.net/projects/whitestaruml/' }],
  }),
  tool({
    id: 'argouml', name: 'ArgoUML', vendor: 'ArgoUML project', website: 'https://argouml-tigris-org.github.io/',
    description: 'A legacy Java UML modeling application retained for historical coverage; it is no longer an actively maintained modern tool.',
    operatingSystems: ['Windows', 'macOS', 'Linux'], deliveryModes: ['Desktop Application'], runtimes: ['JVM'], standards: ['UML'], toolTypes: ['Model editor'],
    sourceLicense: 'Open Source', spdxLicenseId: 'EPL-1.0', pricingModels: ['Free'], licenseTerms: ['Perpetual'], commercialUseAllowed: true, modelingModes: ['Graphical'],
    classificationNotes: ['The project is legacy/inactive. Its licensing page also documents legacy BSD-licensed components, so the SPDX field represents the main project license rather than every bundled file.'],
    sources: [{ label: 'Official ArgoUML project site', url: 'https://argouml-tigris-org.github.io/' }, { label: 'Official license page', url: 'https://argouml-tigris-org.github.io/tigris/wiki-argouml/wiki/License.html' }],
  }),
  tool({
    id: 'nomnoml', name: 'nomnoml', vendor: 'nomnoml project', website: 'https://nomnoml.com/',
    description: 'An open-source text-to-UML diagram renderer available as a web app, command-line tool, and JavaScript library.',
    deliveryModes: ['Web Application', 'CLI', 'Library / SDK'], runtimes: ['Browser JavaScript', 'Node.js'], standards: ['UML'], toolTypes: ['Diagramming tool', 'Library / SDK'],
    sourceLicense: 'Open Source', spdxLicenseId: 'MIT', pricingModels: ['Free'], licenseTerms: ['Perpetual'], commercialUseAllowed: true, modelingModes: ['Textual'],
    sources: [{ label: 'Official nomnoml web app', url: 'https://nomnoml.com/' }, { label: 'Official source repository', url: 'https://github.com/skanaar/nomnoml' }],
  }),
  tool({
    id: 'kroki', name: 'Kroki', vendor: 'Kroki project', website: 'https://kroki.io/',
    description: 'An open-source unified diagram-rendering API that delegates UML-compatible text formats to engines such as PlantUML, nomnoml, and UMLet.',
    deliveryModes: ['API Service'], runtimes: ['JVM', 'Container'], standards: ['UML'], toolTypes: ['Diagram rendering API'],
    sourceLicense: 'Open Source', spdxLicenseId: 'MIT', pricingModels: ['Free'], licenseTerms: ['Perpetual'], commercialUseAllowed: true, modelingModes: ['Textual'],
    classificationNotes: ['Kroki aggregates rendering engines; it is not itself a semantic UML/SysML repository or model editor. No standalone Kroki CLI is claimed.'],
    sources: [{ label: 'Official Kroki site', url: 'https://kroki.io/' }, { label: 'Official source repository', url: 'https://github.com/yuzutech/kroki' }],
  }),
  tool({
    id: 'pyreverse', name: 'Pyreverse', vendor: 'Pylint project', website: 'https://pylint.readthedocs.io/en/latest/additional_tools/pyreverse/index.html',
    description: 'A Python command-line reverse-engineering tool that creates UML class and package diagrams in PlantUML, Mermaid, Graphviz, and image formats.',
    operatingSystems: ['Windows', 'macOS', 'Linux'], deliveryModes: ['CLI'], runtimes: ['Python'], standards: ['UML'], toolTypes: ['Reverse engineering tool'],
    sourceLicense: 'Open Source', spdxLicenseId: 'GPL-2.0-or-later', pricingModels: ['Free'], licenseTerms: ['Perpetual'], commercialUseAllowed: true, modelingModes: ['Textual'],
    featureEvidence: { reverseEngineering: evidence('https://pylint.readthedocs.io/en/latest/additional_tools/pyreverse/index.html', 'The official documentation describes UML diagram generation from Python packages and classes.') },
    sources: [{ label: 'Official Pyreverse documentation', url: 'https://pylint.readthedocs.io/en/latest/additional_tools/pyreverse/index.html' }, { label: 'Official Pylint repository', url: 'https://github.com/pylint-dev/pylint' }],
  }),
];

const independentPatches = {
  'openmbee-flexo-mms': { sourceLicense: 'Open Source', spdxLicenseId: 'Apache-2.0', licenseTerms: ['Perpetual'], commercialUseAllowed: true },
  'ansys-system-architecture-modeler': { sourceLicense: 'Proprietary' },
  'astah-sysml-v2-editor': { sourceLicense: 'Proprietary' },
  'astah-sysml': { sourceLicense: 'Proprietary' },
  'astah-system-safety': { sourceLicense: 'Proprietary' },
  'celedon-davinci': { sourceLicense: 'Proprietary' },
  dalus: { sourceLicense: 'Proprietary' },
  'intercax-syndeia': { sourceLicense: 'Proprietary' },
  'siemens-systems-modeler-sysml-v2': { sourceLicense: 'Proprietary' },
  'syside-automator': { sourceLicense: 'Proprietary' },
  'tom-sawyer-sysml-v2-viewer': { sourceLicense: 'Proprietary' },
  'visual-paradigm-sysml-v2-studio': { sourceLicense: 'Proprietary' },
};

for (const record of additions) {
  await writeFile(new URL(`${record.id}.json`, directory), `${JSON.stringify(record, null, 2)}\n`, 'utf8');
}

for (const [id, patch] of Object.entries(independentPatches)) {
  const url = new URL(`${id}.json`, directory);
  const current = JSON.parse(await readFile(url, 'utf8'));
  const updated = { ...current, ...patch, lastChecked: CHECKED_AT, classificationReviewedAt: CHECKED_AT };
  await writeFile(url, `${JSON.stringify(updated, null, 2)}\n`, 'utf8');
}

console.log(`Applied the 2026-11 review: ${additions.length} additions and ${Object.keys(independentPatches).length} independent-record patches.`);
