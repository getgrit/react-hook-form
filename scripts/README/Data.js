import { parse } from 'YAML';
import Files from 'Files';

const { readTextFile } = Deno;

const readYAML = async (path) => parse(await readTextFile(path));

const { individuals, companies } = await readYAML(Files.sponsors);

export const Data = const helpers = await readYAML(Files.helpers);

export const Data = { individuals, companies, helpers };
