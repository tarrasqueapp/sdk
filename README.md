<h1 align="center">
  <a href="https://tarrasque.app" target="_blank"><img src="https://tarrasque.app/images/logo.svg" width="150" /></a>
  <p>@tarrasque/sdk</p>
</h1>

This package contains the core logic for the Tarrasque SDK. You can use this package to build your own custom plugins for Tarrasque App.

> **Warning**
> This project is in pre-alpha and is not yet ready for public use.

## Installation

```sh
npm install @tarrasque/sdk
```

## Usage

### Listening for events

```ts
import { TarrasqueEvent, tarrasque } from '@tarrasque/sdk';

tarrasque.on(TarrasqueEvent.PINGED_LOCATION, (payload) => {
  // Do something with the payload
});
```

### Sending events

```ts
import { TarrasqueEvent, tarrasque } from '@tarrasque/sdk';

tarrasque.emit(TarrasqueEvent.PING_LOCATION, {
  coordinates: { x: 23, y: 42},
  ...
});
```

### Creating a plugin

```ts
import { TarrasqueEvent, TarrasquePlugin, tarrasque } from '@tarrasque/sdk';

export default class ExamplePlugin extends TarrasquePlugin {
  name: '@tarrasque/example-plugin',
  version: '1.0.0',
  title = 'Example Plugin';
  description = 'An example plugin for Tarrasque';
  author = 'Tarrasque App';

  constructor() {
    super();

    tarrasque.on(TarrasqueEvent.PINGED_LOCATION, (data) => {
      console.log('Location pinged!', data);
    });
  }

  renderDockElement() {
    return <div>Example Plugin</div>;
  }
}
```
