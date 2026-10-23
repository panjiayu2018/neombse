import { readdir, readFile } from 'node:fs/promises';

const directory = new URL('../src/data/tools/', import.meta.url);
const files = (await readdir(directory)).filter((name) => name.endsWith('.json'));
const tools = await Promise.all(files.map(async (file) => JSON.parse(await readFile(new URL(file, directory), 'utf8'))));
const states = new Set(['Yes', 'No', 'Unknown']);
const ids = new Set();
const errors = [];

for (const tool of tools) {
  if (!tool.id || ids.has(tool.id)) errors.push(`${tool.id || '<missing id>'}: duplicate or missing id`);
  ids.add(tool.id);

  for (const field of ['operatingSystems', 'deliveryModes', 'runtimes', 'hostApplications', 'pricingModels', 'licenseTerms']) {
    if (!Array.isArray(tool[field])) errors.push(`${tool.id}: ${field} must be an array`);
  }
  if (!tool.deliveryModes?.length) errors.push(`${tool.id}: deliveryModes cannot be empty`);
  if (!tool.pricingModels?.length) errors.push(`${tool.id}: pricingModels cannot be empty`);
  if (!tool.sourceLicense) errors.push(`${tool.id}: sourceLicense is required`);
  if (!tool.standards?.length) errors.push(`${tool.id}: standards cannot be empty`);
  if (!tool.sources?.length) errors.push(`${tool.id}: at least one source is required`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tool.lastChecked ?? '')) errors.push(`${tool.id}: lastChecked must use YYYY-MM-DD`);

  for (const source of tool.sources ?? []) {
    if (!source.label || !/^https?:\/\//.test(source.url ?? '')) {
      errors.push(`${tool.id}: every source requires a label and an HTTP(S) URL`);
    }
  }

  const ambiguousOs = tool.operatingSystems?.filter((value) => /cross-platform|browser/i.test(value)) ?? [];
  if (ambiguousOs.length) errors.push(`${tool.id}: invalid operating-system values: ${ambiguousOs.join(', ')}`);

  for (const [feature, state] of Object.entries(tool.features ?? {})) {
    if (!states.has(state)) errors.push(`${tool.id}: invalid ${feature} state ${state}`);
  }
  for (const [feature, evidence] of Object.entries(tool.featureEvidence ?? {})) {
    if (!(feature in (tool.features ?? {}))) errors.push(`${tool.id}: evidence references unknown feature ${feature}`);
    if (tool.features?.[feature] !== evidence.status) errors.push(`${tool.id}: ${feature} evidence status does not match feature status`);
    if (!evidence.url || !evidence.checkedAt) errors.push(`${tool.id}: ${feature} evidence requires url and checkedAt`);
  }

  if (tool.sourceCollection === 'NeoMBSE coverage audit') {
    for (const [feature, state] of Object.entries(tool.features ?? {})) {
      if (state === 'Yes' && !tool.featureEvidence?.[feature]) {
        errors.push(`${tool.id}: audited Yes state for ${feature} requires fact-level evidence`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Tool-data validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const evidenceCount = tools.reduce((total, tool) => total + Object.keys(tool.featureEvidence ?? {}).length, 0);
console.log(`Validated ${tools.length} tool records and ${evidenceCount} capability-evidence entries.`);
