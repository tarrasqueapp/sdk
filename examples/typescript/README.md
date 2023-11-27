<h1 align="center">
  <a href="https://tarrasque.app" target="_blank"><img src="https://tarrasque.app/images/logo.svg" width="150" /></a>
  <p>@tarrasque/example-plugin</p>
</h1>

This is an example plugin for Tarrasque App, showcasing how to use the [Tarrasque SDK](https://github.com/tarrasqueapp/sdk) to build your own plugins.

# Overview

`@tarrasque/example-plugin` is a basic implementation designed to illustrate the fundamental concepts and functionalities available in the Tarrasque SDK. It includes event handling, custom dock elements, and event emission.

# Features

- **Event Listening:** Shows the campaign name in the plugin's dock element.
- **Dock Element Rendering:** Provides a user interface element in the dock.
- **Event Emission:** (TODO) Emits an event when the user clicks on the dock element.

# Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.12.1 or higher)
- [pnpm](https://pnpm.io/) (v8.8.0 or higher)

# Setup

Run the following command to install dependencies:

```bash
pnpm install
```

# Usage

To use the plugin in a development environment:

```bash
pnpm dev
```

This command lauches a local server and continuously recompiles the plugin on change. You can add this plugin to Tarrasque App by pointing it to http://localhost:5173/manifest.json in the plugin manager.
