# @pipeworx/mcp-chucknorris

MCP server for [chucknorris.io](https://api.chucknorris.io) — random Chuck Norris jokes, keyword search, categories, and category-filtered jokes. Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `random_joke` | Get a random Chuck Norris joke |
| `search_jokes` | Search jokes by keyword |
| `list_categories` | List all joke categories |
| `joke_by_category` | Get a random joke from a specific category |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "chucknorris": {
      "type": "url",
      "url": "https://gateway.pipeworx.io/chucknorris"
    }
  }
}
```

## CLI Usage

```bash
npx @anthropic-ai/mcp-client https://gateway.pipeworx.io/chucknorris
```

## License

MIT
