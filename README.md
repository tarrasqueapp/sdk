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

This package contains the core logic for the Tarrasque SDK. You can use this package to build your own custom plugins for Tarrasque App.

> **Warning**
> This project is in pre-alpha and is not yet ready for public use.

## Installation

```sh
npm install @tarrasque/sdk
```

## Features

The Tarrasque SDK offers a range of features, including:

- Real-time event handling with Socket.IO
- User, campaign, character, map, and notification management
- Custom plugin development capabilities
- Access cached client data from the Tarrasque API

## Usage

### Listening for Events

The SDK allows listening to various events, such as user updates, campaign changes, and map interactions:

```ts
import { TarrasqueEvent, tarrasque } from '@tarrasque/sdk';

tarrasque.on(TarrasqueEvent.USER_UPDATED, (userData) => {
  // Handle user update
});
```

### Emitting Events

You can also emit events to perform actions like creating characters or joining rooms:

```ts
import { TarrasqueEvent, tarrasque } from '@tarrasque/sdk';

tarrasque.emit(TarrasqueEvent.CREATE_CHARACTER, {
  name: 'Hero',
  ...
});
```

# Plugin Development

Develop custom plugins by extending the `TarrasquePlugin` class:

```ts
import { TarrasqueEvent, TarrasquePlugin, tarrasque } from '@tarrasque/sdk';

export default class CustomPlugin extends TarrasquePlugin {
  name: '@tarrasque/custom-plugin',
  version: '1.0.0',
  title = 'Custom Plugin';
  description = 'A custom plugin for Tarrasque';
  author = 'Developer';

  constructor() {
    super();
    // Event handling
    tarrasque.on(TarrasqueEvent.MAP_UPDATED, (mapData) => {
      console.log('Map updated', mapData);
    });
  }

  renderDockElement() {
    return <div>Custom Plugin UI</div>;
  }
}
```

For an example of a custom plugin, see the [Example Plugin](https://github.com/tarrasqueapp/example-plugin) repository.
