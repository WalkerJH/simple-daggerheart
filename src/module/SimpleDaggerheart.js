import { SIMPLE_DAGGERHEART_SYSTEM } from './config/system.js';
import { SimpleDHCardSheet } from './sheets/SimpleDHCardSheet.js';
import { SimpleDHCharacterSheet } from './sheets/SimpleDHCharacterSheet.js';
import { SimpleDHCharacter } from './data/SimpleDHCharacter.js';

const { Items, Actors } = foundry.documents.collections;

function setupConfig() {
  CONFIG.SIMPLE_DAGGERHEART_SYSTEM = SIMPLE_DAGGERHEART_SYSTEM;
}

function registerDataModels() {
  CONFIG.Actor.dataModels.character = SimpleDHCharacter;
}

function registerSheets() {
  Items.unregisterSheet('core', foundry.applications.sheets.ItemSheetV2);
  Items.registerSheet(SIMPLE_DAGGERHEART_SYSTEM.id, SimpleDHCardSheet, {
    types: ['section'],
    makeDefault: true
  });

  Actors.unregisterSheet('core', foundry.applications.sheets.ActorSheetV2);
  Actors.registerSheet(SIMPLE_DAGGERHEART_SYSTEM.id, SimpleDHCharacterSheet, {
    types: ['character'],
    makeDefault: true,
    label: 'Character'
  });
}

async function preloadTemplates() {
  const { loadTemplates } = foundry.applications.handlebars;
  await loadTemplates({
    'simple-daggerheart.character-sheet.statuses':
      'systems/simple-daggerheart/src/templates/character-sheet/character-sheet-statuses.hbs',
    'simple-daggerheart.character-sheet.experiences':
      'systems/simple-daggerheart/src/templates/character-sheet/character-sheet-experiences.hbs',
    'simple-daggerheart.character-sheet.features':
      'systems/simple-daggerheart/src/templates/character-sheet/character-sheet-features.hbs',
    'simple-daggerheart.character-sheet.weapons':
      'systems/simple-daggerheart/src/templates/character-sheet/character-sheet-weapons.hbs',
    'simple-daggerheart.character-sheet.items':
      'systems/simple-daggerheart/src/templates/character-sheet/character-sheet-items.hbs'
  });
}

Hooks.once('init', async () => {
  console.log(
    'Simple Daggerheart System | Initializing Simple Daggerheart System'
  );

  setupConfig();
  registerDataModels();
  registerSheets();
  preloadTemplates();
});
