import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BOTH_MODE_IDS,
  CODE_GENERATOR_IDS,
  DRAWING_TOOL_IDS,
  STANDARD_OVERRIDES,
  TEXTUAL_IDS,
  TOOL_OVERRIDES,
} from './legacy-tool-overrides.mjs';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDirectory, '..');
const sourceDirectory = join(root, 'tools');
const dataDirectory = join(root, 'src', 'data', 'tools');
const imageDirectory = join(root, 'public', 'images', 'tools');
const importedOn = '2026-10-22';

const decode = (value) => value
  .replace(/<br\s*\/?\s*>/gi, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;/gi, "'")
  .replace(/\s+/g, ' ')
  .trim();

function parseEntries(html, source) {
  const titlePattern = /<p[^>]*tool-version-title[^>]*>([\s\S]*?)<\/p>/gi;
  const matches = [...html.matchAll(titlePattern)];

  return matches.map((match, index) => {
    const nextIndex = matches[index + 1]?.index ?? html.length;
    const block = html.slice(match.index, nextIndex);
    const paragraphs = [...block.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((item) => decode(item[1]))
      .filter(Boolean);
    const heading = decode(match[1]).replace(/^工具最新版本：/, '').trim();
    const descriptionStart = paragraphs.indexOf('工具简介');
    const addressStart = paragraphs.indexOf('获得地址');
    const addressText = addressStart >= 0 ? paragraphs.slice(addressStart + 1).find((text) => /^https?:\/\//i.test(text)) : null;
    const image = block.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? null;

    return {
      source,
      heading,
      updated: (paragraphs.find((text) => text.startsWith('更新时间：')) ?? '').replace(/^更新时间：/, '').trim(),
      description: paragraphs.slice(descriptionStart + 1).filter((text) =>
        !text.startsWith('平台：')
        && !text.startsWith('费用：')
        && text !== '获得地址'
        && !/^https?:\/\//i.test(text)
      ),
      platform: (paragraphs.find((text) => text.startsWith('平台：')) ?? '').replace(/^平台：/, '').trim(),
      fee: (paragraphs.find((text) => text.startsWith('费用：')) ?? '').replace(/^费用：/, '').trim(),
      image,
      website: addressText,
    };
  });
}

function parseDate(value) {
  const match = value.match(/(20\d{2})年(\d{1,2})月(\d{1,2})日/);
  if (!match) return null;
  return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
}

function platforms(value) {
  const result = [];
  if (/浏览器|HTML/i.test(value)) result.push('Browser');
  if (/Windows/i.test(value)) result.push('Windows');
  if (/Linux/i.test(value)) result.push('Linux');
  if (/macOS|MacOS|Mac\b/i.test(value)) result.push('macOS');
  if (/iOS|iPadOS/i.test(value)) result.push('iOS');
  if (/Chrome OS/i.test(value)) result.push('Chrome OS');
  if (/多平台|Java|\.NET/i.test(value) && result.length === 0) result.push('Cross-platform');
  return [...new Set(result.length ? result : ['Not specified'])];
}

function accessModes(value) {
  const result = [];
  if (/浏览器|HTML/i.test(value)) result.push('Web application');
  if (/VS Code|Visual Studio Code|Eclipse/i.test(value)) result.push('Editor integration');
  if (/Jupyter/i.test(value)) result.push('Notebook');
  if (/CLI|命令行/i.test(value)) result.push('Command line');
  if (!result.length || /独立版|Windows|Linux|macOS|MacOS|Java|\.NET/i.test(value)) result.push('Desktop');
  return [...new Set(result)];
}

function runtimes(value) {
  const result = [];
  if (/VS Code|Visual Studio Code/i.test(value)) result.push('VS Code');
  if (/Eclipse/i.test(value)) result.push('Eclipse');
  if (/Jupyter/i.test(value)) result.push('Jupyter');
  if (/Node\.js/i.test(value)) result.push('Node.js');
  if (/Java/i.test(value)) result.push('Java');
  if (/\.NET/i.test(value)) result.push('.NET');
  if (/浏览器|HTML/i.test(value)) result.push('Browser');
  if (!result.length) result.push('Native application');
  return [...new Set(result)];
}

function licenses(value) {
  if (!value) return ['Unknown'];
  const hasOpenSource = value.includes('开源');
  const hasCommercial = value.includes('商业') || value.includes('付费') || value.includes('计价');
  const hasFree = value.includes('免费');
  if (hasOpenSource) return hasCommercial ? ['Open Source', 'Commercial'] : ['Open Source'];
  if (hasFree && hasCommercial) return ['Freemium', 'Commercial'];
  if (hasCommercial) return ['Commercial'];
  if (hasFree) return ['Freeware'];
  return ['Unknown'];
}

function featureStates(id, sourceDescription) {
  const states = {
    xmiImport: 'Unknown',
    xmiExport: 'Unknown',
    collaboration: 'Unknown',
    codeGeneration: 'Unknown',
    reverseEngineering: 'Unknown',
    simulation: 'Unknown',
    requirementsManagement: 'Unknown',
    sysmlV2Api: 'Unknown',
  };
  if (/导入.*XMI|XMI文件导入/i.test(sourceDescription)) states.xmiImport = 'Yes';
  if (/导出.*XMI|XMI.*导出/i.test(sourceDescription)) states.xmiExport = 'Yes';
  if (/协作|团队/i.test(sourceDescription)) states.collaboration = 'Yes';
  if (/代码生成|生成.*代码/i.test(sourceDescription)) states.codeGeneration = 'Yes';
  if (/逆向/i.test(sourceDescription)) states.reverseEngineering = 'Yes';
  if (/仿真|模拟/i.test(sourceDescription)) states.simulation = 'Yes';
  if (/需求/i.test(sourceDescription)) states.requirementsManagement = 'Yes';
  if (id === 'sysml-v2-pilot') states.sysmlV2Api = 'Yes';
  return states;
}

function toolTypes(id) {
  if (CODE_GENERATOR_IDS.has(id)) return ['Code generator'];
  if (DRAWING_TOOL_IDS.has(id)) return ['Diagramming tool'];
  return ['Model editor'];
}

function modelingModes(id) {
  if (BOTH_MODE_IDS.has(id)) return ['Graphical', 'Textual'];
  return TEXTUAL_IDS.has(id) ? ['Textual'] : ['Graphical'];
}

const [umlHtml, sysmlHtml] = await Promise.all([
  readFile(join(sourceDirectory, 'umltools.html'), 'utf8'),
  readFile(join(sourceDirectory, 'sysmltools.html'), 'utf8'),
]);

const umlEntries = parseEntries(umlHtml, 'uml');
const sysmlEntries = parseEntries(sysmlHtml, 'sysml');
const umlHeadings = new Set(umlEntries.map((entry) => entry.heading));
const sysmlOnlyEntries = sysmlEntries.filter((entry) => !umlHeadings.has(entry.heading));
const entries = [...umlEntries, ...sysmlOnlyEntries];

await Promise.all([mkdir(dataDirectory, { recursive: true }), mkdir(imageDirectory, { recursive: true })]);

const imported = [];
for (const entry of entries) {
  const override = TOOL_OVERRIDES[entry.heading];
  if (!override) throw new Error(`Missing English metadata for: ${entry.heading}`);
  if (!entry.website) throw new Error(`Missing product address for: ${entry.heading}`);
  if (!entry.image) throw new Error(`Missing image for: ${entry.heading}`);

  const sourceDescriptionZh = entry.description.join('\n\n');
  const standards = entry.source === 'sysml'
    ? ['SysML v2']
    : (STANDARD_OVERRIDES[override.id] ?? ['UML']);
  const imageName = basename(entry.image);
  const tool = {
    id: override.id,
    name: override.name,
    vendor: override.vendor,
    website: entry.website,
    description: override.summary,
    editorialNote: `Imported from the UMLChina ${entry.source === 'sysml' ? 'SysML v2' : 'UML'} tools collection. The English summary is a concise editorial translation; capability fields remain Unknown unless the source explicitly states support.`,
    platforms: platforms(entry.platform),
    accessModes: accessModes(entry.platform),
    runtimes: runtimes(entry.platform),
    standards,
    toolTypes: toolTypes(override.id),
    licenseTypes: licenses(entry.fee),
    modelingModes: modelingModes(override.id),
    features: featureStates(override.id, sourceDescriptionZh),
    latestVersion: override.version,
    releaseDate: parseDate(entry.updated),
    lastChecked: importedOn,
    image: `/images/tools/${imageName}`,
    sourceDescriptionZh,
    sourceUpdatedText: entry.updated,
    sourceCollection: entry.source === 'sysml' ? 'UMLChina SysML v2 tools' : 'UMLChina UML tools',
    sources: [{ label: 'Product or project page', url: entry.website }],
    featured: new Set(['enterprise-architect', 'plantuml', 'gaphor', 'syson', 'syside', 'catia-magic-cameo-sysml-v2']).has(override.id),
  };

  const publishedImage = join(imageDirectory, imageName);
  await writeFile(join(dataDirectory, `${tool.id}.json`), `${JSON.stringify(tool, null, 2)}\n`, 'utf8');
  try {
    await copyFile(join(sourceDirectory, entry.image), publishedImage);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    await access(publishedImage);
  }
  imported.push(tool);
}

const uniqueIds = new Set(imported.map((tool) => tool.id));
if (uniqueIds.size !== imported.length) throw new Error('Duplicate generated tool IDs detected.');

console.log(`Imported ${imported.length} unique tools (${umlEntries.length} UML + ${sysmlOnlyEntries.length} SysML v2).`);
console.log(`Copied ${new Set(imported.map((tool) => tool.image)).size} referenced images.`);
