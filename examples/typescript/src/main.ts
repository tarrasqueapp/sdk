import { Campaign, tarrasque } from '@tarrasque/sdk';

import './style.css';

let campaign: Campaign;

async function main() {
  tarrasque.emit('VIEWPORT_SET_POSITION', { x: 0, y: 0 });
  tarrasque.emit('VIEWPORT_SET_SCALE', 1);

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
    const map = await tarrasque.get('MAP');

    // Get the selected media from the map
    const selectedMedia = map.media.find((media) => media.id === map.selectedMediaId);
    if (!selectedMedia) return;

    // Randomize the location of the ping
    const x = Math.random() * selectedMedia.width;
    const y = Math.random() * selectedMedia.height;

    // Send the ping location event to the parent window
    tarrasque.emit('PING_LOCATION', { x, y });
  });
}

tarrasque.on('READY', async () => {
  campaign = await tarrasque.get('CAMPAIGN');
  main();
});

tarrasque.on('CAMPAIGN_CHANGED', (updatedCampaign) => {
  campaign = updatedCampaign;
  main();
});

// Re-render on hot reload in development
if (import.meta.hot) {
  import.meta.hot.accept();
  tarrasque.emit('READY');
  main();
}
