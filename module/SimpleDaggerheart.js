import { SIMPLE_DAGGERHEART_SYSTEM } from './config/system.js';
import { SimpleDHCardSheet } from './sheets/SimpleDHCardSheet.js';
import { SimpleDHCharacterSheet } from './sheets/SimpleDHCharacterSheet.js';
import { SimpleDHCharacter } from './data/SimpleDHCharacter.js';

const { Items, Actors } = foundry.documents.collections;
// const { loadTemplates } = foundry.applications.handlebars;

function setupConfig() {
  CONFIG.SIMPLE_DAGGERHEART_SYSTEM = SIMPLE_DAGGERHEART_SYSTEM;
  CONFIG.INIT = true;
}

function registerDataModels() {
  Object.assign(CONFIG.Actor.dataModels, {
    character: SimpleDHCharacter
  });
}

function registerSheets() {
  Items.unregisterSheet('core', foundry.applications.sheets.ItemSheetV2);
  Items.registerSheet(SIMPLE_DAGGERHEART_SYSTEM.id, SimpleDHCardSheet, {
    types: ['card'],
    makeDefault: true
  });

  Actors.unregisterSheet('core', foundry.applications.sheets.ActorSheetV2);
  Actors.registerSheet(SIMPLE_DAGGERHEART_SYSTEM.id, SimpleDHCharacterSheet, {
    types: ['character'],
    makeDefault: true,
    label: 'Character'
  });
}

// function preloadTemplates() {
//   const templatePaths = [];

//   return loadTemplates(templatePaths);
// }

Hooks.once('init', async () => {
  console.log(
    'Simple Daggerheart System | Initializing Simple Daggerheart System'
  );

  setupConfig();
  registerDataModels();
  registerSheets();
  // preloadTemplates();
});
