# @tarrasque/sdk

This package contains the core logic for the Tarrasque SDK. You can use this package to build your own custom plugins for Tarrasque App.

## Installation

```sh
yarn add @tarrasque/sdk
```

## Usage

### Listening for events

```ts
import { TarrasqueEvent, tarrasque } from '@tarrasque/sdk';

tarrasque.on(TarrasqueEvent.CREATED_CHARACTER, (payload) => {
  // Do something with the payload
});
```

### Sending events

```ts
import { TarrasqueEvent, tarrasque } from '@tarrasque/sdk';

tarrasque.emit(TarrasqueEvent.CREATE_CHARACTER, {
  name: 'My Character',
  ...
});
```

### Creating a plugin

```ts
import { TarrasquePlugin } from '@tarrasque/sdk';

export default new TarrasquePlugin({
  name: '@tarrasque/dnd5e-plugin',
  version: '1.0.0',
});
```
