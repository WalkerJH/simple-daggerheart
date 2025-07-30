import { SIMPLE_DAGGERHEART_SYSTEM } from './config/system.js';
import { SimpleDHCardSheet } from './sheets/card-sheet.js';
import { SimpleDHCharacterSheet } from './sheets/character-sheet.js';

const { Items, Actors } = foundry.documents.collections;
const { loadTemplates } = foundry.applications.handlebars;

function setupConfig() {
  CONFIG.SIMPLE_DAGGERHEART_SYSTEM = SIMPLE_DAGGERHEART_SYSTEM;
  CONFIG.INIT = true;
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
    makeDefault: true
  });
}

// function preloadTemplates() {
//   const templatePaths = [
//     'templates/character-sheet/character-sheet-header.hbs',
//     'templates/character-sheet/character-sheet-stats.hbs'
//   ];

//   return loadTemplates(templatePaths);
// }

Hooks.once('init', async () => {
  console.log(
    'Simple Daggerheart System | Initializing Simple Daggerheart System'
  );

  setupConfig();
  registerSheets();
  // preloadTemplates();
});
