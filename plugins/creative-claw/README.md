# Creative Claw plugin

Creative Claw is an AI media studio for Grok Bot, Hermes, OpenClaw, Cursor, and other compatible agents. It combines a hosted MCP server with an agent skill for producing consistent, on-brand media from natural-language requests.

## Capabilities

- Generate and edit images with production AI models.
- Generate videos, speech, and talking avatars.
- Create brand themes and reuse them across generations.
- Render branded HTML graphics and reusable templates.
- Import, search, tag, edit, and organize media assets.
- Guide multi-step character, storyboard, and film workflows.

The plugin contains one skill, `creativeclaw`, and one remote MCP server connection.

## Install

After marketplace approval, search for **Creative Claw** in Grok Bot or the Cursor Marketplace and choose **Install**. The first tool call opens Creative Claw authentication in your browser.

For local review in Cursor, place or symlink this directory at:

```text
~/.cursor/plugins/local/creative-claw
```

Then restart Cursor or run **Developer: Reload Window** and inspect the plugin under **Customize**.

### Hermes Agent

```bash
hermes mcp add creative-claw --url https://app.creativeclaw.co/mcp --auth oauth
hermes mcp login creative-claw
```

### OpenClaw

After the package is available on ClawHub:

```bash
openclaw plugins install clawhub:@creativeclaw/plugin
openclaw plugins enable creative-claw
openclaw mcp login creative-claw
openclaw gateway restart
```

## Authentication and billing

Creative Claw uses browser-based OAuth through Clerk. The plugin does not contain or require an API key. Authentication is scoped to the signed-in Creative Claw account.

Media generation consumes Creative Claw credits and may incur usage-based charges. Balance and pricing tools are available through the MCP server before generation.

## Network and data disclosure

The plugin connects to:

- `https://app.creativeclaw.co/mcp` — Creative Claw's Streamable HTTP MCP endpoint.
- `https://clerk.creativeclaw.co` — OAuth authorization and token service discovered through the MCP endpoint's protected-resource metadata.

Requests sent to the MCP server can include prompts, uploaded or referenced media, brand settings, and tool parameters needed to complete the requested operation. Generated media and asset metadata are stored in the user's Creative Claw account. The plugin does not install executables, run lifecycle hooks, or read local credentials.

Some tools can create, update, or delete assets, themes, and templates. Grok Bot or Cursor applies its normal confirmation and team-policy controls to these tools.

## Policies and support

- [Privacy policy](https://creativeclaw.co/privacy)
- [Terms of service](https://creativeclaw.co/terms)
- Support: [support@creativeclaw.co](mailto:support@creativeclaw.co)
- Source: [CreativeClawCo/creative-claw-marketplace](https://github.com/CreativeClawCo/creative-claw-marketplace)

Licensed under Apache-2.0. See [LICENSE](./LICENSE).
