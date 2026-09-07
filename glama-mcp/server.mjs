#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const MCP_APP_URL = "https://app.creativeclaw.co/mcp";
const WEBSITE_URL = "https://creativeclaw.co";

const server = new McpServer({
  name: "creative-claw-glama-mcp",
  version: "1.0.0",
});

// Helper function to create guidance responses
function createGuidanceResponse(toolName, args) {
  const baseGuidance = {
    status: "info",
    message: "This is a lightweight directory introspection server for Glama.ai compatibility. To use the full Creative Claw platform with working generation tools, please connect to the production MCP server.",
    setup: {
      description: "Connect to Creative Claw's full MCP server with OAuth authentication",
      mcp_url: MCP_APP_URL,
      website: WEBSITE_URL,
      free_credits: "New accounts receive free trial credits to start generating immediately",
      supported_clients: [
        "Claude Desktop",
        "Claude Code",
        "Cursor",
        "ChatGPT",
        "Codex",
        "Hermes Agent",
        "OpenClaw",
        "Grok Bot",
      ],
      setup_instructions: {
        claude_desktop: {
          description: "Add to claude_desktop_config.json",
          config: {
            mcpServers: {
              "creative-claw": {
                type: "http",
                url: MCP_APP_URL,
              },
            },
          },
        },
        cursor: {
          description: "Install from Cursor Marketplace",
          steps: [
            "Open Settings → Plugins → Marketplace",
            "Search for 'Creative Claw'",
            "Click Install",
            "Complete OAuth authentication on first use",
          ],
        },
        hermes: {
          description: "Add via Hermes CLI",
          commands: [
            `hermes mcp add creative-claw --url ${MCP_APP_URL} --auth oauth`,
            "hermes mcp login creative-claw",
          ],
        },
      },
    },
    tool_requested: toolName,
    tool_arguments: args || {},
    next_steps: [
      "Visit https://creativeclaw.co to create an account and claim free credits",
      `Configure your MCP client to connect to ${MCP_APP_URL}`,
      "Authenticate via OAuth (no API keys needed)",
      "Start generating images, videos, and speech across 1,000+ AI models",
    ],
  };

  const toolGuidance = {
    how_to_connect: {
      primary_action: "Setup instructions provided above",
      capabilities: [
        "Generate images with FLUX, Gemini, GPT Image, Recraft, and 100+ models",
        "Create videos with Veo, Sora, Kling, Seedance, MiniMax, Hailuo, and more",
        "Generate speech with ElevenLabs v3 and voice cloning",
        "Edit media: background removal, upscaling, trimming, subtitles",
        "Manage brand themes, Characters, and multi-shot Films",
        "Access asset library and reusable creative elements",
      ],
    },
    generate_image: {
      recommended_models: {
        "nano-banana-2": "Default cost-efficient model (Gemini 3.1 Flash)",
        "nano-banana-pro": "Complex layouts and typography",
        "gpt-image-2": "Instruction-heavy edits and transparency",
        "seedream-5-pro": "Premium product and commercial imagery",
      },
      features: [
        "Text-to-image generation",
        "Image-to-image editing and style transfer",
        "Background removal and replacement",
        "Product photography with custom lighting",
        "Multi-model comparison",
        "Aspect ratio control and transparency support",
      ],
    },
    generate_video: {
      recommended_models: {
        "gemini-omni-flash": "Default general video with native audio",
        "seedance-2.5": "Premium cinematic work with references",
        "minimax-h3-max": "Fast cinematic clips with audio",
        "veo-3.1": "Google's latest video model",
      },
      features: [
        "Text-to-video generation (2-30+ seconds)",
        "Image-to-video animation",
        "Reference-based generation for style consistency",
        "Native audio support on select models",
        "Multi-shot film production with Characters",
        "Storyboard-to-video workflows",
      ],
    },
    generate_speech: {
      recommended_model: "elevenlabs-v3",
      features: [
        "Multilingual narration and dialogue",
        "Emotional and expressive delivery",
        "Character voice management",
        "Consent-based voice cloning (with user confirmation)",
        "Integration with video generation for voiceovers",
      ],
    },
    list_models: {
      model_count: "1,000+ production-ready AI models",
      categories: ["image", "video", "speech", "audio"],
      discovery: "Filter by category, compare costs, check capabilities",
    },
    get_model_params: {
      provides: [
        "Supported dimensions and aspect ratios",
        "Duration ranges for video models",
        "Reference and multimodal input capabilities",
        "Cost per generation",
        "Expert prompting guidelines",
        "Technical limitations and recommendations",
      ],
    },
    check_job: {
      use_case: "Monitor long-running video and image generation jobs",
      returns: [
        "Job status (queued, in_progress, completed, failed)",
        "Progress percentage and time estimates",
        "Permanent media URLs (never expire)",
        "Error messages and debugging info",
      ],
    },
    list_characters: {
      description: "Characters are reusable identities for consistent multi-shot content",
      features: [
        "Visual consistency across video generations",
        "Optional ElevenLabs voice cloning (with consent)",
        "Use in Film projects for branded storytelling",
        "Combine with brand themes for on-brand content",
      ],
    },
    get_credits_balance: {
      pricing: "Usage-based—pay only for what you generate",
      free_credits: "New accounts include trial credits",
      no_subscription: "No monthly fees or commitments",
    },
  };

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            ...baseGuidance,
            tool_guidance: toolGuidance[toolName] || { note: "See setup instructions above" },
          },
          null,
          2
        ),
      },
    ],
  };
}

// Register tools
server.tool(
  "how_to_connect",
  "Learn how to connect to the full Creative Claw MCP server with authentication. Creative Claw is an AI media generation platform supporting 1,000+ models (FLUX, Gemini, Veo, Sora, Kling, Seedance, HeyGen, ElevenLabs) for image, video, and speech generation. This tool explains setup for Claude Desktop, Cursor, ChatGPT, and other MCP clients, plus how to claim free credits.",
  {},
  async () => createGuidanceResponse("how_to_connect", {})
);

server.tool(
  "generate_image",
  "Generate high-quality images using AI models including FLUX, Gemini, GPT Image, Recraft, and more. Supports text-to-image, image-to-image editing, style transfer, background removal, and professional product photography. Handles transparency, aspect ratios, and multi-model comparison. Requires connection to the full Creative Claw MCP server.",
  {
    prompt: z.string().describe("Description of the image to generate"),
  },
  async (args) => createGuidanceResponse("generate_image", args)
);

server.tool(
  "generate_video",
  "Generate cinematic video content using state-of-the-art models including Gemini Omni, Veo, Sora, Kling, Seedance, MiniMax, and Hailuo. Supports text-to-video, image-to-video animation, reference-based generation, native audio, and multi-shot film production. Handles durations from 2-30+ seconds depending on model. Requires connection to the full Creative Claw MCP server.",
  {
    prompt: z.string().describe("Description of the video to generate"),
  },
  async (args) => createGuidanceResponse("generate_video", args)
);

server.tool(
  "generate_speech",
  "Generate expressive, natural-sounding speech and voiceovers using ElevenLabs models. Supports multilingual narration, dialogue, emotional delivery, custom Character voices, and consent-based voice cloning. Ideal for video narration, audiobooks, podcasts, and UGC content. Requires connection to the full Creative Claw MCP server.",
  {
    text: z.string().describe("Text to convert to speech"),
  },
  async (args) => createGuidanceResponse("generate_speech", args)
);

server.tool(
  "list_models",
  "Discover all available AI models for image, video, and speech generation across Creative Claw's catalog. Returns model IDs, capabilities, cost estimates, reference support, duration limits, and recommended use cases. Access 1,000+ production-ready models through a unified API. Requires connection to the full Creative Claw MCP server.",
  {
    category: z
      .enum(["image", "video", "speech"])
      .optional()
      .describe("Filter by category: 'image', 'video', or 'speech'"),
  },
  async (args) => createGuidanceResponse("list_models", args)
);

server.tool(
  "get_model_params",
  "Get detailed parameters, prompting guidelines, and technical specifications for a specific AI model. Returns supported dimensions, duration ranges, reference capabilities, cost structure, and expert prompting tips. Essential for optimizing generation quality and understanding model-specific features. Requires connection to the full Creative Claw MCP server.",
  {
    model_id: z
      .string()
      .describe(
        "Model ID (e.g., 'image/nano-banana-2', 'video/gemini-omni-flash', 'speech/elevenlabs-v3')"
      ),
  },
  async (args) => createGuidanceResponse("get_model_params", args)
);

server.tool(
  "check_job",
  "Check the status and retrieve results of asynchronous generation jobs. Video and some image generations are queued; this tool monitors progress and returns completed media URLs. Returns job status (queued, in_progress, completed, failed), progress percentage, estimated completion time, and permanent media URLs. Requires connection to the full Creative Claw MCP server.",
  {
    job_id: z.string().describe("Job ID returned from a generation request"),
  },
  async (args) => createGuidanceResponse("check_job", args)
);

server.tool(
  "list_characters",
  "List reusable Characters (persistent identities with visual appearance and optional voice) for consistent multi-shot video production, UGC ads, and branded content. Characters maintain identity across generations and can be combined with brand themes for on-brand storytelling. Supports ElevenLabs voice cloning with explicit consent. Requires connection to the full Creative Claw MCP server.",
  {},
  async () => createGuidanceResponse("list_characters", {})
);

server.tool(
  "get_credits_balance",
  "Check your current Creative Claw credits balance and usage history. Creative Claw uses usage-based pricing—pay only for what you generate, no subscriptions. New accounts include free trial credits. This tool returns your remaining balance, recent usage, and a link to purchase more credits. Requires connection to the full Creative Claw MCP server.",
  {},
  async () => createGuidanceResponse("get_credits_balance", {})
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Creative Claw Glama MCP stdio server running");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
