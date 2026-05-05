export const commandsData = [
  // General
  { name: "/help", description: "Show all available commands and usage hints.", category: "General" },
  { name: "/clear", description: "Start a fresh conversation. CLAUDE.md instructions stay active.", category: "General" },
  { name: "/status", description: "Show current version, model, account, and permission mode.", category: "General" },
  { name: "/login", description: "Switch Anthropic accounts mid-session.", category: "General" },
  { name: "/rename", description: "Rename the current session for easier recall later.", category: "General" },
  { name: "/export", description: "Save the conversation as a markdown file. Useful for documentation.", category: "General" },
  { name: "/btw", description: "Ask a quick side question without adding it to conversation history.", category: "General" },
  { name: "/doctor", description: "Run a health check on your Claude Code installation.", category: "General" },

  // Optimization
  { name: "/compact", description: "Summarise conversation to free context tokens. Accepts a focus instruction, e.g. /compact focus on the auth module.", category: "Optimization" },
  { name: "/context", description: "Show context window usage with a visual breakdown of token allocation.", category: "Optimization" },
  { name: "/cost", description: "Show session token usage and estimated API cost.", category: "Optimization" },
  { name: "/effort", description: "Set reasoning depth: low, medium, high, xhigh, or max. Higher = slower but smarter.", category: "Optimization" },
  { name: "/model", description: "Switch between Sonnet, Opus, and Haiku mid-session without restarting.", category: "Optimization" },

  // Workflow
  { name: "/diff", description: "Open an interactive viewer for all uncommitted changes in the repo.", category: "Workflow" },
  { name: "/review", description: "Analyse code changes on the current branch and surface suggestions.", category: "Workflow" },
  { name: "/simplify", description: "Review recently changed files for code quality, reuse, and efficiency.", category: "Workflow" },
  { name: "/plan", description: "Research-first mode — Claude reads the codebase and presents a plan for your approval before touching anything.", category: "Workflow" },
  { name: "/branch", description: "Fork the conversation into a parallel branch to explore risky approaches without losing your place.", category: "Workflow" },
  { name: "/rewind", description: "Roll back to a previous message and undo all file changes made after that point.", category: "Workflow" },
  { name: "/resume", description: "Restore a previously saved session by name or ID.", category: "Workflow" },
  { name: "/loop", description: "Run a task on a recurring interval within the session. E.g. /loop 5m check build errors.", category: "Workflow" },
  { name: "/schedule", description: "Create a cloud-backed scheduled task that runs even when your laptop is closed.", category: "Workflow" },
  { name: "/debug", description: "Toggle verbose mode to see every tool call and thinking step as it happens.", category: "Workflow" },

  // Configuration
  { name: "/init", description: "Scan your project and auto-generate a starter CLAUDE.md with detected stack and conventions.", category: "Setup" },
  { name: "/memory", description: "View and edit CLAUDE.md memory files — global, project-level, and auto-saved.", category: "Configuration" },
  { name: "/permissions", description: "View and manage tool permissions. Edits .claude/settings.json.", category: "Configuration" },
  { name: "/config", description: "Open Claude Code configuration and settings UI.", category: "Configuration" },

  // Agents
  { name: "/batch", description: "Split a large task across parallel agents in isolated git worktrees. Great for wide refactors.", category: "Agents" },
  { name: "/agents", description: "List, create, edit, or remove subagent definitions stored in .claude/agents/.", category: "Agents" },

  // Integrations
  { name: "/mcp", description: "Show active MCP server connections, available tools, and trigger OAuth flows.", category: "Integrations" },
  { name: "/plugin", description: "Manage plugins — install from marketplace or GitHub, list, remove, or reload.", category: "Integrations" },
  { name: "/reload-plugins", description: "Hot-reload all plugin files during development without restarting.", category: "Integrations" },

  // Security
  { name: "/sandbox", description: "Enable OS-level isolation — restricts filesystem and network access for the session.", category: "Security" },
];

export const shortcutsData = [
  { keys: "Shift + Tab", action: "Cycle through permission modes (default → plan → acceptEdits → auto)", category: "Permissions" },
  { keys: "Ctrl + C", action: "Cancel the current operation immediately", category: "Control" },
  { keys: "Ctrl + D", action: "Exit Claude Code (same as typing 'exit')", category: "Control" },
  { keys: "Ctrl + B", action: "Send a running subagent to the background so you can keep chatting", category: "Agents" },
  { keys: "Alt + T  (Mac: Option+T)", action: "Toggle extended thinking / reasoning mode on or off", category: "Optimization" },
  { keys: "Ctrl + O", action: "Toggle verbose / debug mode — see every tool call in real time", category: "Debug" },
  { keys: "Ctrl + G", action: "Open the current plan in your external editor (e.g. VS Code)", category: "Workflow" },
  { keys: "Ctrl + K", action: "Open in-session search across conversation history", category: "Navigation" },
  { keys: "Esc", action: "Dismiss the current dialog, suggestion, or autocomplete popup", category: "Navigation" },
];
