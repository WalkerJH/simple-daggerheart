import { SIMPLE_DAGGERHEART } from 'modules/config.js';
import { SYSTEM } from 'modules/config/system.js';

const { Items, Actors } = foundry.documents.collections;

function registerSheets() {
  Items.unregisterSheet('core', foundry.applications.sheets.ItemSheetV2);
  DocumentSheetConfig.registerSheet(SYSTEM.id, simpleDHItemSheet, {
    types: ['item'],
    makeDefault: true
  });

  Actors.unregisterSheet('core', foundry.applications.sheets.ActorSheetV2);
  DocumentSheetConfig.registerSheet(SYSTEM.id, SimpleDHCharacterSheet, {
    types: ['character'],
    makeDefault: true
  });
}

function preloadTemplates() {
  const templatePaths = [];

  return loadTemplates(templatePaths);
}

Hooks.once('init', async () => {
  console.log(
    'Simple Daggerheart System | Initializing Simple Daggerheart System);'
  );

  CONFIG.SIMPLE_DAGGERHEART = SIMPLE_DAGGERHEART;
  CONFIG.INIT = true;

  registerSheets();
  preloadTemplates();
});
