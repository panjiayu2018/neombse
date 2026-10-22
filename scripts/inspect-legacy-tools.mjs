import { readFile } from 'node:fs/promises';

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
    const updatedText = paragraphs.find((text) => text.startsWith('更新时间：')) ?? '';
    const platformText = paragraphs.find((text) => text.startsWith('平台：')) ?? '';
    const feeText = paragraphs.find((text) => text.startsWith('费用：')) ?? '';
    const descriptionStart = paragraphs.indexOf('工具简介');
    const description = paragraphs.slice(descriptionStart + 1).filter((text) =>
      !text.startsWith('平台：')
      && !text.startsWith('费用：')
      && text !== '获得地址'
      && !/^https?:\/\//i.test(text)
    );
    const image = block.match(/<img[^>]+src="([^"]+)"/i)?.[1] ?? null;
    const links = [...block.matchAll(/<a[^>]+href="([^"]+)"/gi)].map((item) => item[1]);
    const website = links.findLast((url) => /^https?:\/\//i.test(url)) ?? null;

    return {
      source,
      heading,
      updated: updatedText.replace(/^更新时间：/, '').trim(),
      description,
      platform: platformText.replace(/^平台：/, '').trim(),
      fee: feeText.replace(/^费用：/, '').trim(),
      image,
      website,
    };
  });
}

const [umlHtml, sysmlHtml] = await Promise.all([
  readFile(new URL('../tools/umltools.html', import.meta.url), 'utf8'),
  readFile(new URL('../tools/sysmltools.html', import.meta.url), 'utf8'),
]);

const uml = parseEntries(umlHtml, 'uml');
const sysml = parseEntries(sysmlHtml, 'sysml');
const umlHeadings = new Set(uml.map((entry) => entry.heading));
const shared = sysml.filter((entry) => umlHeadings.has(entry.heading));
const sysmlOnly = sysml.filter((entry) => !umlHeadings.has(entry.heading));

console.log(JSON.stringify({
  counts: { uml: uml.length, sysml: sysml.length, shared: shared.length, sysmlOnly: sysmlOnly.length },
  sysmlOnly,
  uml,
}, null, 2));
