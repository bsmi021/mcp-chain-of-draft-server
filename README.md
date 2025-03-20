# MCP Chain of Draft Server 🧠

Chain of Draft Server is a powerful AI-driven tool that helps developers make better decisions through systematic, iterative refinement of thoughts and designs. It integrates seamlessly with popular AI agents and provides a structured approach to reasoning, API design, architecture decisions, code reviews, and implementation planning.

<a href="https://glama.ai/mcp/servers/exar7zd4f0">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/exar7zd4f0/badge" alt="Chain of Draft Thinking MCP server" />
</a>

## 🌟 Features

### Core Capabilities

* **Iterative Reasoning**: Systematic improvement through the Chain of Draft protocol
* **Thought History**: Track and manage reasoning iterations
* **Branching Support**: Focus reviews on specific reasoning steps
* **TypeScript Support**: Full TypeScript implementation with Zod validation
* **Error Handling**: Comprehensive error types and handling
* **Real-time Logging**: Built-in debugging and monitoring system

## 🚀 Getting Started

### Prerequisites

* Node.js >= 16.0.0
* npm >= 8.0.0

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bsmi021/mcp-chain-of-draft-server.git
cd mcp-chain-of-draft-server
```

2. Install dependencies:

```bash
npm install
```

### Configuration

Simple server configuration in `initialize.ts`:

```typescript
const serverConfig = {
    name: "chain-of-draft",
    version: "1.0.0",
}
```

## 💡 Usage Examples

### Chain of Draft Protocol

```typescript
const thoughtData = {
    reasoning_chain: ["Initial analysis of the problem"],
    next_step_needed: true,
    draft_number: 1,
    total_drafts: 3,
    is_critique: true,
    critique_focus: "logical_consistency"
};
```

## 🛠️ Development

### Project Structure

```
src/
├── tools/                          # Specialized Tools
│   ├── chainOfDraft/              # Core Protocol
│   └── index.ts / # Entry Point
├── utils/                         # Utilities
└── index.ts                      # Entry Point
```

### Starting Development Server

```bash
npm run dev
```

## ❓ FAQ

### How does the Chain of Draft protocol work?

The protocol guides you through systematic improvement of your thinking through iterative drafts and focused critiques.

### Can I customize the critique dimensions?

Yes! Each tool supports custom critique focuses tailored to your specific needs.

### How many drafts should I plan for?

We recommend 3-5 drafts for most tasks, but you can adjust based on complexity.

## 🤝 Contributing

We welcome contributions! Please check our [Contributing Guidelines](CONTRIBUTING.md).

## 👥 Community & Support

* GitHub Issues - Report bugs or suggest features
* Pull Requests - Submit your contributions
* Documentation - Check our detailed docs

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

* Thanks to our contributors and early adopters
* Special thanks to the MCP community
* Inspired by systematic reasoning methodologies

---

Made with 🧠 by @bsmi021