#!/usr/bin/env node
/**
 * NicheAI MCP Server
 * Exposes NicheAI capabilities through the Model Context Protocol
 * Supports both stdio and HTTP/SSE transports
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import {
  translateToLight,
  createLightMemory,
  visualizeLightMemory,
  photonicToHex,
  type LightMemory,
} from "./lib/lightLanguage.js";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFileSync } from "fs";
import { join } from "path";

// Configuration
const PORT = parseInt(process.env.MCP_PORT || "3001", 10);
const HOST = process.env.MCP_HOST || "0.0.0.0";

// In-memory storage for light memories
const lightMemories: Map<string, LightMemory> = new Map();

// Create MCP server
function createMcpServer() {
  const server = new Server(
    {
      name: "nicheai-mcp-server",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "translate_to_light",
          description:
            "Translate text into Light Language (photonic sequences). Converts knowledge into color-coded wavelengths based on semantic meaning, inspired by diamond quantum computer NV center encoding.",
          inputSchema: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "The text to translate into light language",
              },
              category: {
                type: "string",
                enum: ["technology", "spirituality", "science", "philosophy", "general"],
                description: "Category of the content for better color mapping",
              },
            },
            required: ["text"],
          },
        },
        {
          name: "create_light_memory",
          description:
            "Create and store a Light Memory from text. This encodes knowledge as photonic sequences with energy levels and coherence metrics.",
          inputSchema: {
            type: "object",
            properties: {
              text: {
                type: "string",
                description: "The text to encode as a light memory",
              },
              category: {
                type: "string",
                description: "Category of the memory (e.g., technology, spirituality)",
              },
              emotionalResonance: {
                type: "string",
                description: "Emotional quality of the memory (e.g., joyful, peaceful, powerful)",
              },
            },
            required: ["text", "category"],
          },
        },
        {
          name: "get_light_memory",
          description: "Retrieve a stored light memory by its ID",
          inputSchema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "The ID of the light memory to retrieve",
              },
            },
            required: ["id"],
          },
        },
        {
          name: "list_light_memories",
          description: "List all stored light memories",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Optional filter by category",
              },
              limit: {
                type: "number",
                description: "Maximum number of memories to return",
              },
            },
          },
        },
        {
          name: "photonic_to_blockchain",
          description:
            "Convert a photonic sequence to hex format suitable for blockchain storage",
          inputSchema: {
            type: "object",
            properties: {
              memoryId: {
                type: "string",
                description: "The ID of the light memory to convert",
              },
            },
            required: ["memoryId"],
          },
        },
        {
          name: "analyze_color_meaning",
          description:
            "Analyze the meaning of colors in the NicheAI light language system",
          inputSchema: {
            type: "object",
            properties: {
              color: {
                type: "string",
                enum: ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"],
                description: "The color to analyze",
              },
            },
            required: ["color"],
          },
        },
        {
          name: "quantum_chat",
          description:
            "Send a message to the NicheAI quantum-enhanced chat system (requires running server)",
          inputSchema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                description: "The message to send",
              },
              context: {
                type: "string",
                description: "Optional context for the conversation",
              },
            },
            required: ["message"],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "translate_to_light": {
        const text = args?.text as string;
        const category = args?.category as string | undefined;

        if (!text) {
          throw new McpError(ErrorCode.InvalidParams, "Text is required");
        }

        const sequence = translateToLight(text, category);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  colors: sequence.colors.slice(0, 50),
                  wavelengths: sequence.wavelengths.slice(0, 50),
                  meaning: sequence.meaning,
                  energyLevel: sequence.energyLevel,
                  coherence: sequence.coherence,
                  colorCount: sequence.colors.length,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "create_light_memory": {
        const text = args?.text as string;
        const category = args?.category as string;
        const emotionalResonance = (args?.emotionalResonance as string) || "neutral";

        if (!text || !category) {
          throw new McpError(ErrorCode.InvalidParams, "Text and category are required");
        }

        const memory = createLightMemory(text, category, emotionalResonance);
        lightMemories.set(memory.id, memory);

        const visualization = visualizeLightMemory(memory);
        return {
          content: [
            {
              type: "text",
              text: `Light Memory Created!\n\nID: ${memory.id}\n${visualization}`,
            },
          ],
        };
      }

      case "get_light_memory": {
        const id = args?.id as string;

        if (!id) {
          throw new McpError(ErrorCode.InvalidParams, "Memory ID is required");
        }

        const memory = lightMemories.get(id);
        if (!memory) {
          throw new McpError(ErrorCode.InvalidParams, `Memory not found: ${id}`);
        }

        const visualization = visualizeLightMemory(memory);
        return {
          content: [
            {
              type: "text",
              text: visualization,
            },
          ],
        };
      }

      case "list_light_memories": {
        const category = args?.category as string | undefined;
        const limit = (args?.limit as number) || 10;

        let memories = Array.from(lightMemories.values());

        if (category) {
          memories = memories.filter((m) => m.category === category);
        }

        memories = memories.slice(0, limit);

        const summaries = memories.map((m) => ({
          id: m.id,
          category: m.category,
          emotionalResonance: m.emotionalResonance,
          energyLevel: m.photonicSequence.energyLevel,
          coherence: m.photonicSequence.coherence,
          meaning: m.photonicSequence.meaning,
          timestamp: new Date(m.timestamp).toISOString(),
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(summaries, null, 2),
            },
          ],
        };
      }

      case "photonic_to_blockchain": {
        const memoryId = args?.memoryId as string;

        if (!memoryId) {
          throw new McpError(ErrorCode.InvalidParams, "Memory ID is required");
        }

        const memory = lightMemories.get(memoryId);
        if (!memory) {
          throw new McpError(ErrorCode.InvalidParams, `Memory not found: ${memoryId}`);
        }

        const hex = photonicToHex(memory.photonicSequence);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  memoryId: memory.id,
                  hexEncoding: hex,
                  colorCount: memory.photonicSequence.colors.length,
                  readyForBlockchain: true,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "analyze_color_meaning": {
        const color = args?.color as string;

        const colorData: Record<string, { meaning: string; wavelength: number; frequency: string }> = {
          Red: {
            meaning: "Foundation/Security/Survival - Grounding energy, protection, stability",
            wavelength: 700,
            frequency: "428 THz",
          },
          Orange: {
            meaning: "Creativity/Emotion/Flow - Creative expression, emotional intelligence",
            wavelength: 620,
            frequency: "484 THz",
          },
          Yellow: {
            meaning: "Power/Intelligence/Will - Mental clarity, personal power, knowledge",
            wavelength: 580,
            frequency: "517 THz",
          },
          Green: {
            meaning: "Love/Healing/Growth - Heart energy, connection, blockchain links",
            wavelength: 530,
            frequency: "566 THz",
          },
          Blue: {
            meaning: "Truth/Communication/Expression - Data, information, clarity",
            wavelength: 470,
            frequency: "638 THz",
          },
          Indigo: {
            meaning: "Intuition/Vision/Insight - AI, neural networks, deep understanding",
            wavelength: 450,
            frequency: "667 THz",
          },
          Violet: {
            meaning: "Consciousness/Transcendence/Unity - Quantum states, spiritual awareness",
            wavelength: 400,
            frequency: "750 THz",
          },
        };

        const data = colorData[color];
        if (!data) {
          throw new McpError(ErrorCode.InvalidParams, `Unknown color: ${color}`);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  color,
                  ...data,
                  nvCenterApplication:
                    "This color maps to specific NV center states in diamond quantum computers",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "quantum_chat": {
        const message = args?.message as string;
        const context = args?.context as string | undefined;

        if (!message) {
          throw new McpError(ErrorCode.InvalidParams, "Message is required");
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  status: "processed",
                  message: message,
                  context: context || "default",
                  note: "Connect to http://localhost:3000/api/quantum-chat for full quantum-enhanced responses",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  });

  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "nicheai://readme",
          name: "NicheAI README",
          description: "Project documentation and overview",
          mimeType: "text/markdown",
        },
        {
          uri: "nicheai://color-meanings",
          name: "Light Language Color Meanings",
          description: "Complete reference of color-to-meaning mappings",
          mimeType: "application/json",
        },
        {
          uri: "nicheai://api-endpoints",
          name: "API Endpoints",
          description: "Available API endpoints in the NicheAI system",
          mimeType: "application/json",
        },
      ],
    };
  });

  // Read resources
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    switch (uri) {
      case "nicheai://readme":
        return {
          contents: [
            {
              uri,
              mimeType: "text/markdown",
              text: `# NicheAI - Quantum-Enhanced AI Platform

NicheAI combines quantum computing concepts with blockchain technology and AI to create a unique knowledge encoding and storage system.

## Key Features

- **Light Language Translation**: Convert text into photonic sequences based on semantic meaning
- **Quantum Blockchain**: Store encoded memories on the Niche Network blockchain
- **AI Integration**: Multiple AI backends (Anthropic, OpenAI, Ollama)
- **Infinite Memory**: Quantum-inspired memory storage system

## Light Language System

The Light Language system encodes knowledge as color sequences:
- Red (700nm): Foundation/Security
- Orange (620nm): Creativity/Emotion
- Yellow (580nm): Intelligence/Power
- Green (530nm): Love/Growth/Connection
- Blue (470nm): Truth/Communication
- Indigo (450nm): Intuition/Vision
- Violet (400nm): Consciousness/Transcendence

## Getting Started

1. Start the development server: \`npm run dev\`
2. Connect to the MCP server for tool access
3. Use the Light Language tools to encode and store knowledge`,
            },
          ],
        };

      case "nicheai://color-meanings":
        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(
                {
                  colors: [
                    {
                      name: "Red",
                      wavelength: 700,
                      frequency: "428 THz",
                      meaning: "Foundation/Security/Survival",
                      keywords: ["ground", "foundation", "secure", "safe", "survive", "protect"],
                      quantumMapping: "Bitcoin, crypto, tokens, security",
                    },
                    {
                      name: "Orange",
                      wavelength: 620,
                      frequency: "484 THz",
                      meaning: "Creativity/Emotion/Flow",
                      keywords: ["create", "emotion", "feel", "flow", "passion", "desire"],
                      quantumMapping: "Energy, power, force, wave",
                    },
                    {
                      name: "Yellow",
                      wavelength: 580,
                      frequency: "517 THz",
                      meaning: "Power/Intelligence/Will",
                      keywords: ["power", "will", "think", "mind", "intelligence", "know"],
                      quantumMapping: "Compute, process, calculate, algorithm",
                    },
                    {
                      name: "Green",
                      wavelength: 530,
                      frequency: "566 THz",
                      meaning: "Love/Healing/Growth",
                      keywords: ["love", "heal", "heart", "grow", "compassion", "care"],
                      quantumMapping: "Blockchain, chain, link, connect",
                    },
                    {
                      name: "Blue",
                      wavelength: 470,
                      frequency: "638 THz",
                      meaning: "Truth/Communication/Expression",
                      keywords: ["truth", "speak", "communicate", "express", "say", "tell"],
                      quantumMapping: "Data, information, knowledge, learn",
                    },
                    {
                      name: "Indigo",
                      wavelength: 450,
                      frequency: "667 THz",
                      meaning: "Intuition/Vision/Insight",
                      keywords: ["wisdom", "insight", "vision", "see", "perceive", "understand"],
                      quantumMapping: "Neural, network, AI, intelligence",
                    },
                    {
                      name: "Violet",
                      wavelength: 400,
                      frequency: "750 THz",
                      meaning: "Consciousness/Transcendence/Unity",
                      keywords: ["sacred", "divine", "spirit", "soul", "transcend", "mystical"],
                      quantumMapping: "Quantum, superposition, entangle, coherence",
                    },
                  ],
                },
                null,
                2
              ),
            },
          ],
        };

      case "nicheai://api-endpoints":
        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(
                {
                  endpoints: [
                    { path: "/api/ai", method: "POST", description: "AI chat endpoint" },
                    { path: "/api/chat", method: "POST", description: "General chat" },
                    { path: "/api/quantum-chat", method: "POST", description: "Quantum-enhanced chat" },
                    { path: "/api/quantum-status", method: "GET", description: "Quantum system status" },
                    { path: "/api/quantum-internet", method: "POST", description: "Quantum internet operations" },
                    { path: "/api/quantum-blockchain", method: "POST", description: "Quantum blockchain operations" },
                    { path: "/api/memory/store", method: "POST", description: "Store memory" },
                    { path: "/api/memory/retrieve", method: "GET", description: "Retrieve memories" },
                    { path: "/api/knowledge", method: "POST", description: "Knowledge base operations" },
                    { path: "/api/coinbase/webhook", method: "POST", description: "Coinbase webhook handler" },
                    { path: "/api/health", method: "GET", description: "Health check endpoint" },
                  ],
                },
                null,
                2
              ),
            },
          ],
        };

      default:
        throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    }
  });

  return server;
}

// HTTP/SSE Server
async function startHttpServer() {
  const activeTransports = new Map<string, SSEServerTransport>();

  const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    const url = new URL(req.url || "/", `http://${req.headers.host}`);

    // Logo endpoint
    if (url.pathname === "/logo" || url.pathname === "/logo.jpg" || url.pathname === "/icon") {
      try {
        const logoPath = join(process.cwd(), "public", "nicheai-logo.jpg");
        const logoData = readFileSync(logoPath);
        res.writeHead(200, {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400"
        });
        res.end(logoData);
        return;
      } catch (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Logo not found" }));
        return;
      }
    }

    // Health check endpoint
    if (url.pathname === "/health" || url.pathname === "/") {
      const baseUrl = `http://${req.headers.host}`;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        status: "ok",
        server: "nicheai-mcp-server",
        name: "NicheAI",
        version: "1.0.0",
        description: "Quantum-Enhanced AI Platform with Light Language Translation",
        icon: `${baseUrl}/logo`,
        transport: "sse",
        endpoints: {
          sse: "/sse",
          messages: "/messages",
          health: "/health",
          logo: "/logo"
        }
      }));
      return;
    }

    // SSE endpoint for establishing connection
    if (url.pathname === "/sse") {
      console.log("New SSE connection");

      const transport = new SSEServerTransport("/messages", res);
      const sessionId = crypto.randomUUID();
      activeTransports.set(sessionId, transport);

      const server = createMcpServer();

      res.on("close", () => {
        console.log(`SSE connection closed: ${sessionId}`);
        activeTransports.delete(sessionId);
      });

      await server.connect(transport);
      return;
    }

    // Messages endpoint for receiving client messages
    if (url.pathname === "/messages" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        try {
          // Find the transport from the session
          const sessionId = url.searchParams.get("sessionId");
          if (sessionId && activeTransports.has(sessionId)) {
            const transport = activeTransports.get(sessionId)!;
            await transport.handlePostMessage(req, res, body);
          } else {
            // Handle message for the most recent transport
            const transports = Array.from(activeTransports.values());
            if (transports.length > 0) {
              await transports[transports.length - 1].handlePostMessage(req, res, body);
            } else {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "No active SSE connection" }));
            }
          }
        } catch (error) {
          console.error("Error handling message:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal server error" }));
        }
      });
      return;
    }

    // 404 for unknown routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  });

  httpServer.listen(PORT, HOST, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           NicheAI MCP Server - HTTP/SSE Mode                  ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Server running at: http://${HOST}:${PORT}                       ║
║                                                               ║
║  Endpoints:                                                   ║
║    GET  /         - Server info                               ║
║    GET  /health   - Health check                              ║
║    GET  /sse      - SSE connection endpoint                   ║
║    POST /messages - Message handling                          ║
║                                                               ║
║  Connect with:                                                ║
║    URL: http://localhost:${PORT}/sse                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);
  });
}

// Stdio Server
async function startStdioServer() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("NicheAI MCP Server running on stdio");
}

// Main entry point
async function main() {
  const args = process.argv.slice(2);
  const mode = args.includes("--http") || args.includes("--sse") ? "http" : "stdio";

  if (mode === "http") {
    await startHttpServer();
  } else {
    await startStdioServer();
  }
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
