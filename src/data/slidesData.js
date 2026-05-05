export const slidesData = [
  {
    level: "Beginner",
    title: "The Fundamentals",
    lessons: [
      {
        id: "m0",
        title: "0. Getting Started",
        content: "Claude Code is an AI coding agent that lives in your terminal. It can read, edit, and run code across your entire project. Install it once, authenticate, and start working — no IDE plugin needed.",
        demoType: "terminal",
        terminalSequence: [
          { input: "npm install -g @anthropic-ai/claude-code", delay: 600, output: "added 1 package in 3s\n✓ claude-code installed globally" },
          { input: "claude auth login", delay: 800, output: "Opening browser for authentication...\n✓ Authenticated as h.elouardy@innoby.de" },
          { input: "claude", delay: 600, output: "Claude Code v1.10.0  (claude-sonnet-4-6)\nType a prompt or /help to see all commands." },
          { input: "What's in this project and how is it structured?", delay: 1400, output: "This is a React + Vite app with:\n• src/App.jsx — main component\n• src/components/ — 5 UI components\n• src/data/ — slidesData.js, commands.js\n• package.json — React 18, framer-motion, lucide-react\n\nWhat would you like to build or fix?" }
        ]
      },
      {
        id: "m1",
        title: "1. Essential Slash Commands",
        content: "Slash commands control how Claude behaves in your session. /status checks your setup, /cost tracks token spend, /compact frees up context, and /btw lets you ask a quick question without it ending up in history.",
        demoType: "terminal",
        terminalSequence: [
          { input: "/status", delay: 400, output: "Version:    1.10.0\nModel:      claude-sonnet-4-6\nAccount:    h.elouardy@innoby.de\nMode:       default (prompts before edits)" },
          { input: "/cost", delay: 400, output: "Session:    14 minutes\nAPI calls:  18\nTokens in:  24,810  |  out: 4,390\nEst. cost:  ~$0.11" },
          { input: "/compact Focus only on the authentication changes.", delay: 900, output: "Summarised 32 messages → 4 key points about auth.\nFreed ~15,000 tokens. Continuing with full context." },
          { input: "/btw What does JWT stand for?", delay: 600, output: "JSON Web Token — a compact, URL-safe format for representing claims between two parties.\n(Side question — not added to conversation history)" }
        ]
      },
      {
        id: "m2",
        title: "2. Memory & CLAUDE.md",
        content: "CLAUDE.md is your project's instruction manual for Claude. Commit it alongside your code so every teammate gets the same conventions — stack details, naming rules, test commands — automatically applied in every session.",
        demoType: "liveCode",
        liveCode: {
          before: "# Innoby Platform\n\n## Stack\n- React 18 + TypeScript\n- NestJS backend\n- PostgreSQL + Prisma",
          command: "Add our code style rules, testing conventions, and branching workflow to CLAUDE.md.",
          after: "# Innoby Platform\n\n## Stack\n- React 18 + TypeScript\n- NestJS backend\n- PostgreSQL + Prisma\n\n## Code Style\n- Named exports only — no default exports\n- Arrow functions for React components\n- All API calls via `src/api/client.ts`\n- Absolute imports using `@/` alias\n\n## Testing\n- Run `npm test` before every commit\n- Unit: Jest + React Testing Library\n- E2E: Playwright in `tests/e2e/`\n\n## Git Workflow\n- Branches: `feat/`, `fix/`, `chore/`\n- Always run `npm run lint` before pushing\n- PRs require at least one reviewer"
        }
      },
      {
        id: "m3",
        title: "3. Project Setup with /init",
        content: "Starting on a new repo? /init scans your project and generates a CLAUDE.md automatically — detected frameworks, build commands, import conventions, and directory structure all included. The fastest way to onboard Claude to any codebase.",
        demoType: "terminal",
        terminalSequence: [
          { input: "/init", delay: 700, output: "Scanning project structure..." },
          { input: "", delay: 1300, output: "Detected: React 18, TypeScript, Vite, Tailwind CSS v4\nFound: 47 components, 12 custom hooks, Jest config\nAnalysing patterns and conventions..." },
          { input: "", delay: 1100, output: "✓ Generated CLAUDE.md\n\nIncludes:\n  • Build:   npm run dev / npm run build\n  • Test:    npm test\n  • Lint:    npm run lint\n  • Imports: absolute paths via @/\n  • State:   Zustand stores in src/stores/\n\nReview the file, then commit it to share with your team." }
        ]
      },
      {
        id: "m4",
        title: "4. Conversation Control",
        content: "Three commands every developer needs: /branch (fork the conversation to try a risky approach without losing your place), /rewind (undo Claude's last changes), and /export (save a session as a markdown document).",
        demoType: "terminal",
        terminalSequence: [
          { input: "/branch try-redis-cache", delay: 600, output: "Created branch 'try-redis-cache'.\nExperimenting here won't affect the main conversation." },
          { input: "Replace the in-memory cache with Redis using ioredis.", delay: 1600, output: "Updated src/cache/index.ts to use ioredis.\nAdded REDIS_URL to .env.example.\nModified 3 files." },
          { input: "Hmm, let's not go with Redis. Too much infra.", delay: 300, output: "" },
          { input: "/rewind", delay: 700, output: "Rolled back to before the Redis changes.\nAll 3 files restored to their original state." },
          { input: "/export redis-exploration.md", delay: 600, output: "Saved 22 messages to redis-exploration.md\nGood reference for the future decision." }
        ]
      }
    ],
    quiz: {
      question: "Which file should you commit so every teammate automatically gets the same Claude conventions and context?",
      options: [".claude.json", "CLAUDE.md", "CLAUDE.local.md", ".env.claude"],
      correctIndex: 1
    }
  },
  {
    level: "Intermediate",
    title: "Extending Capabilities",
    lessons: [
      {
        id: "m5",
        title: "5. Skills",
        content: "Skills are custom tools defined in .claude/skills/. They teach Claude your internal scripts — deploy pipelines, database seeders, proprietary linters — exactly how your team runs them. No more explaining the same commands every session.",
        demoType: "liveCode",
        liveCode: {
          before: "<!-- .claude/skills/ is empty -->",
          command: "Create a skill for running our Prisma database migrations and an optional seed step.",
          after: "<!-- .claude/skills/db-migrate.md -->\n---\nname: db-migrate\ndescription: Run Prisma migrations and optionally seed the database\n---\n\nTo apply pending migrations:\n```bash\nnpx prisma migrate dev\n```\n\nTo migrate AND seed development data:\n```bash\nnpx prisma migrate dev && npx prisma db seed\n```\n\nAlways read migration output carefully before confirming.\nNever run `prisma migrate deploy` locally — that is for CI only."
        }
      },
      {
        id: "m6",
        title: "6. Hooks",
        content: "Hooks run shell commands automatically around Claude's actions. PostToolUse auto-formats any file Claude edits. PreToolUse can block a dangerous command. Stop hooks can ping Slack when a long task finishes.",
        demoType: "terminal",
        terminalSequence: [
          { input: "# .claude/settings.json", delay: 200, output: "{\n  \"hooks\": {\n    \"PostToolUse\": [{\n      \"matcher\": \"Edit\",\n      \"command\": \"prettier --write $CLAUDE_FILE_PATH\"\n    }],\n    \"Stop\": [{\n      \"command\": \"notify-send 'Claude is done'\"\n    }]\n  }\n}" },
          { input: "Fix the missing prop types in UserCard.tsx", delay: 1300, output: "Editing src/components/UserCard.tsx...\n[Hook: PostToolUse → Prettier] Formatted ✓\n\nAdded: id: string, role: 'admin' | 'user' prop types." },
          { input: "Add error handling to the payments API call.", delay: 1300, output: "Editing src/api/payments.ts...\n[Hook: PostToolUse → Prettier] Formatted ✓\n\nAdded try/catch with typed ApiError and toast notification.\n[Hook: Stop] Notification sent." }
        ]
      },
      {
        id: "m7",
        title: "7. MCP Servers",
        content: "MCP (Model Context Protocol) gives Claude access to live external data. Connect GitHub to manage PRs and issues, or connect your database to run queries — all without leaving the terminal.",
        demoType: "terminal",
        terminalSequence: [
          { input: "claude mcp add github -- npx @modelcontextprotocol/server-github", delay: 800, output: "✓ MCP server 'github' configured.\nTools: create_issue, list_prs, search_code, get_file_contents" },
          { input: "claude mcp add postgres -- npx @modelcontextprotocol/server-postgres postgresql://localhost/appdb", delay: 800, output: "✓ MCP server 'postgres' configured.\nTools: query, list_tables, describe_table" },
          { input: "How many users signed up in the last 7 days?", delay: 1600, output: "[MCP: postgres]\nSELECT COUNT(*) FROM users\nWHERE created_at > NOW() - INTERVAL '7 days';\n\n→ 142 new users in the last 7 days." },
          { input: "Create a GitHub issue for the login bug with + in email.", delay: 1300, output: "[MCP: github] Creating issue...\n✓ Issue #247: 'Login fails when email contains +'\n   github.com/innoby/platform/issues/247" }
        ]
      },
      {
        id: "m8",
        title: "8. Subagents & Parallel Work",
        content: "Subagents are specialised Claude instances defined in .claude/agents/. Invoke one with @'agent-name' for focused tasks. Use /batch to fan out a big change across parallel agents — each in an isolated git worktree.",
        demoType: "terminal",
        terminalSequence: [
          { input: "@\"Security Reviewer\" Check the new payment endpoint in src/api/payments.ts", delay: 1900, output: "[Agent: Security Reviewer]\nAnalysing src/api/payments.ts...\n\n⚠  Missing rate limiting on POST /api/payments/create\n⚠  Card number logged at debug level (line 47)\n✓  HTTPS enforced\n✓  Auth middleware present\n\nFix both issues before merging." },
          { input: "/batch Add TypeScript strict mode and fix all resulting type errors.", delay: 2800, output: "Spawning 4 parallel agents in isolated worktrees...\n[Agent 1] Fixed types in src/api/        (12 files) ✓\n[Agent 2] Fixed types in src/components/  (28 files) ✓\n[Agent 3] Fixed types in src/hooks/       ( 8 files) ✓\n[Agent 4] Updated tsconfig.json + lib types          ✓\n\nAll agents done. Zero type errors remaining." }
        ]
      }
    ],
    quiz: {
      question: "What protocol lets Claude Code query your live PostgreSQL database or create GitHub issues directly from the terminal?",
      options: ["REST API integration", "GraphQL subscriptions", "Model Context Protocol (MCP)", "WebSocket bridge"],
      correctIndex: 2
    }
  },
  {
    level: "Advanced",
    title: "Mastery",
    lessons: [
      {
        id: "m9",
        title: "9. Permissions & Security",
        content: "Claude Code has five permission modes — from interactive (default) to fully automated (bypassPermissions for CI/CD pipelines). Lock down dangerous commands in .claude/settings.json and use --sandbox for OS-level network/filesystem isolation.",
        demoType: "terminal",
        terminalSequence: [
          { input: "# Five permission modes:", delay: 200, output: "default        → prompt before edits & bash (daily use)\nplan           → read-only; no changes until you approve\nacceptEdits    → allow file edits, prompt for bash only\nauto           → allow everything without prompting\nbypassPerms    → skip all checks  ← CI/CD pipelines only" },
          { input: "# Run non-interactively in CI:", delay: 300, output: "" },
          { input: "claude -p 'Run tests and report failures' --permission-mode bypassPermissions --output-format json", delay: 1600, output: "{\"status\":\"success\",\"tests\":{\"total\":156,\"passed\":154,\"failed\":2},\"failures\":[\"UserService.spec.ts:42\",\"auth.e2e.ts:18\"]}" },
          { input: "# Deny a dangerous command for the whole team:", delay: 300, output: "# .claude/settings.json\n{\n  \"permissions\": {\n    \"deny\": [\"Bash(rm -rf *)\", \"Bash(git push --force)\"]\n  }\n}" }
        ]
      },
      {
        id: "m10",
        title: "10. The Deep Work Workflow",
        content: "For high-stakes tasks, chain these three steps: /effort high (makes Claude think longer), /plan (Claude researches first and presents a plan — no changes until you approve), then approve and let it implement. AI-speed with human oversight.",
        demoType: "terminal",
        terminalSequence: [
          { input: "/effort high", delay: 400, output: "Reasoning set to HIGH.\nClaude will think more carefully before each action." },
          { input: "/plan Migrate our REST API to tRPC with end-to-end type safety.", delay: 2200, output: "Researching codebase (23 files read)...\n\nPLAN: REST → tRPC Migration\n────────────────────────────\n1. Install trpc, zod, @trpc/server, @trpc/client\n2. Create src/server/trpc.ts router foundation\n3. Migrate 6 routers: users, auth, products, orders,\n   payments, admin  (Zod schemas for each)\n4. Update React Query hooks to tRPC client\n5. Remove axios + express router, update all tests\n\nScope: ~47 file changes across 6 directories.\n\nApprove to begin implementation?" },
          { input: "Looks good. Go ahead.", delay: 3200, output: "Implementing...\n[1/5] ✓ Dependencies installed\n[2/5] ✓ tRPC router foundation created\n[3/5] ✓ 6 routers migrated with Zod validation\n[4/5] ✓ React hooks updated (fully type-safe)\n[5/5] ✓ Tests updated — 154/154 passing\n\nMigration complete. Types flow from DB schema → UI." }
        ]
      },
      {
        id: "m11",
        title: "11. Team Setup & Plugins",
        content: "Go beyond one project: package your Skills, Hooks, and Agents into a plugin that the whole team installs in one command. Use /schedule for recurring cloud-backed tasks that run even when no one is at their desk.",
        demoType: "terminal",
        terminalSequence: [
          { input: "# Team plugin layout:", delay: 200, output: ".claude-plugin/\n├── plugin.json          # Manifest (name, version)\n├── skills/\n│   ├── deploy.md        # Deploy to staging / prod\n│   ├── db-migrate.md    # Prisma migrations\n│   └── create-pr.md     # PR + Jira ticket\n└── agents/\n    └── code-reviewer.md # Innoby review standards" },
          { input: "/plugin install github:innoby/claude-plugin", delay: 1300, output: "Installing Innoby Team Plugin v2.1.0...\n✓ 3 skills:  deploy, db-migrate, create-pr\n✓ 1 agent:   code-reviewer\n✓ 2 hooks:   PostToolUse linter, Stop Slack notifier\n\nAll team tools available immediately." },
          { input: "/schedule 'Security audit on main branch' --cron '0 9 * * 1'", delay: 1000, output: "✓ Scheduled: Security audit every Monday at 09:00\n  Runs in the cloud — no laptop needed.\n  View & manage at: claude.ai/schedules" }
        ]
      }
    ],
    quiz: {
      question: "Which workflow gives you AI-speed execution while keeping a human in the loop for approval before any changes are made?",
      options: ["/auto → implement directly", "/effort high → /plan → approve → implement", "bypassPermissions with --sandbox", "/batch with isolated worktrees"],
      correctIndex: 1
    }
  }
];
