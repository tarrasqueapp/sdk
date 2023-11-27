import { Campaign, tarrasque } from '@tarrasque/sdk';

import './style.css';

let campaign: Campaign;

async function main() {
  console.log('⬆🔌', campaign?.name);

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <p>
        Hi ${campaign.name}
      </p>
    </div>
  `;
}

tarrasque.onReady(async () => {
  campaign = await tarrasque.campaign.get();
  main();
});

tarrasque.campaign.onChange((updatedCampaign) => {
  campaign = updatedCampaign;
  main();
});

// Re-render on HMR
if (import.meta.hot) {
  import.meta.hot.accept();
  campaign = await tarrasque.campaign.get();
  main();
}
