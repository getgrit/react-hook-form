import { toAvatar, toLogo, toLink } from 'Link';

export function generate(company) {
  const { website, avatar, logo } = company;

  const icon = avatar ? toAvatar(avatar) : toLogo(logo);

  const lines = [
    `<a`,
    `    target = _blank`,
    `    href = '${toLink(website)}'`,
    `/>`,
    `    <img`,
    `        width = 94`,
    `        src = '${icon}'`,
    `    />`,
    `</a>`,
  ];

  return lines.join('\n');
}
