/**
 * Chuck Norris MCP — wraps chucknorris.io (free, no auth)
 *
 * Tools:
 * - random_joke: Get a random Chuck Norris joke
 * - search_jokes: Search jokes by keyword
 * - list_categories: List all joke categories
 * - joke_by_category: Get a random joke from a specific category
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.chucknorris.io';

type RawJoke = {
  id: string;
  value: string;
  url: string;
  categories: string[];
  created_at: string;
  updated_at: string;
};

type RawSearchResponse = {
  total: number;
  result: RawJoke[];
};

function formatJoke(j: RawJoke) {
  return {
    id: j.id,
    joke: j.value,
    categories: j.categories,
    url: j.url,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'random_joke',
    description: 'Get a random Chuck Norris joke.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'search_jokes',
    description: 'Search Chuck Norris jokes by keyword.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keyword or phrase to search for within joke text.',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'list_categories',
    description: 'List all available Chuck Norris joke categories.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'joke_by_category',
    description: 'Get a random Chuck Norris joke from a specific category.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Category to fetch a joke from. Use list_categories to see valid values.',
        },
      },
      required: ['category'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_joke':
      return randomJoke();
    case 'search_jokes':
      return searchJokes(args.query as string);
    case 'list_categories':
      return listCategories();
    case 'joke_by_category':
      return jokeByCategory(args.category as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomJoke() {
  const res = await fetch(`${BASE_URL}/jokes/random`);
  if (!res.ok) throw new Error(`chucknorris.io error: ${res.status}`);
  const data = (await res.json()) as RawJoke;
  return formatJoke(data);
}

async function searchJokes(query: string) {
  const res = await fetch(`${BASE_URL}/jokes/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`chucknorris.io error: ${res.status}`);
  const data = (await res.json()) as RawSearchResponse;
  return {
    total: data.total,
    query,
    jokes: data.result.map(formatJoke),
  };
}

async function listCategories() {
  const res = await fetch(`${BASE_URL}/jokes/categories`);
  if (!res.ok) throw new Error(`chucknorris.io error: ${res.status}`);
  const data = (await res.json()) as string[];
  return { categories: data };
}

async function jokeByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/jokes/random?category=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`chucknorris.io error: ${res.status}`);
  const data = (await res.json()) as RawJoke;
  return formatJoke(data);
}

export default { tools, callTool } satisfies McpToolExport;
