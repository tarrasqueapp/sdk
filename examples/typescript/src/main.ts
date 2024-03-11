import { Tarrasque } from '@tarrasque/sdk';

import './style.css';

const tarrasque = new Tarrasque();
let campaign;

async function main() {
  tarrasque.emit('viewport-set-coordinates', { x: 0, y: 0 });
  tarrasque.emit('viewport-set-scale', 1);

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src="/typescript.svg" class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
        <button type="button">Ping Location</button>
    </div>
  `;

  const button = document.querySelector<HTMLButtonElement>('button')!;
  button.addEventListener('click', async () => {
    // Get the current map
    const map = await tarrasque.get('map');

    // Randomize the location of the ping
    const x = Math.random() * map.media.width;
    const y = Math.random() * map.media.height;

    // Send the ping location event to the parent window
    tarrasque.emit('ping-location', { x, y });
  });
}

tarrasque.on('ready', async () => {
  campaign = await tarrasque.get('campaign');
  main();
});

tarrasque.on('campaign-changed', (updatedCampaign) => {
  campaign = updatedCampaign;
  main();
});

// Re-render on hot reload in development
if (import.meta.hot) {
  import.meta.hot.accept();
  tarrasque.emit('ready');
  main();
}
