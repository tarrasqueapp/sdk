<p align="center">
  <a href="https://tarrasque.app">
    <img src="https://tarrasque.app/images/logo.svg" width="150" />
  </a>

  <h1 align="center">@tarrasque/sdk</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/%40tarrasque%2Fsdk" />
  <img src="https://img.shields.io/github/actions/workflow/status/tarrasqueapp/sdk/release.yaml" />
  <img src="https://img.shields.io/github/license/tarrasqueapp/sdk" />
</p>

This package contains the core logic for the Tarrasque Software Development Kit. You can use this package to build your own custom plugins for Tarrasque App.

> **Warning**
> This project is in pre-alpha and is not yet ready for public use.

## Requirements

- [Node.js](https://nodejs.org/en/) (v18.12.1 or higher)

## Installation

```sh
npm install @tarrasque/sdk
```

## Developing a Plugin

Tarrasque SDK allows you to create custom plugins for Tarrasque App. These plugins can be used to add new features to the app, such as custom character sheets or map tools, improve existing features, or even add new game systems.

Plugins are loaded into the app using an iframe. This allows you to use any technologies you want to build your plugin, including React, Vue, or good ol' HTML and JavaScript.

All plugins must be hosted on a public website, such as GitHub Pages, Vercel, or Netlify. Once your plugin is ready, you can submit it to the [Plugins Repository](https://github.com/tarrasqueapp/plugins) to make it available to all Tarrasque users.

Plugins must include a `manifest.json` file, which contains information about the plugin, such as its name, description, and version. This file must be located at the root of the plugin's website.

```json
{
  "id": "typescript-example",
  "name": "TypeScript Example",
  "description": "A simple example of a Tarrasque App plugin written in TypeScript",
  "author": "Tarrasque App",
  "homepage_url": "https://github.com/tarrasqueapp/sdk/tree/main/examples/typescript",
  "plugin_url": "http://localhost:5173",
  "icon": "http://localhost:5173/typescript.svg",
  "iframe": {
    "width": 500,
    "height": 500
  }
}
```

For an example of a custom plugin, see the [examples folder](https://github.com/tarrasqueapp/sdk/tree/main/examples).

## Usage

### Listening for Events

The SDK allows listening to various events, such as campaign changes and map interactions:

```ts
import { tarrasque } from '@tarrasque/sdk';

tarrasque.on('VIEWPORT_CHANGED', (data) => {
  // Handle viewport update
});
```

### Fetching Data

You can fetch data from the Tarrasque API using the `get` method:

```ts
import { tarrasque } from '@tarrasque/sdk';

const position = await tarrasque.get('VIEWPORT_POSITION');
```

### Emitting Events

You can also emit events to perform actions like creating characters, moving the viewport, or updating the map:

```ts
import { tarrasque } from '@tarrasque/sdk';

tarrasque.emit('VIEWPORT_SET_POSITION', {
  x: 0,
  y: 0,
});
```

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING](https://github.com/tarrasqueapp/tarrasqueapp/tree/main/CONTRIBUTING.md) file for more information. If you have any questions, feel free to reach out to us on [Discord](https://tarrasque.app/discord). We'd love to hear from you! 😊

## License

Tarrasque App is licensed under the GNU Affero General Public License. See the [LICENSE](LICENSE) file for more information.
