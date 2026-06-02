# mcp-chucknorris

Chuck Norris MCP — wraps chucknorris.io (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_joke` | Get a random Chuck Norris joke. Returns joke text and ID. |
| `search_jokes` | Search Chuck Norris jokes by keyword. Returns matching jokes with text and IDs. |
| `list_categories` | List all available Chuck Norris joke categories (e.g., \'nerdy\', \'sport\'). Use with joke_by_category to fetch jokes. |
| `joke_by_category` | Get a random Chuck Norris joke from a specific category. Returns joke text and ID. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "chucknorris": {
      "url": "https://gateway.pipeworx.io/chucknorris/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Chucknorris data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
