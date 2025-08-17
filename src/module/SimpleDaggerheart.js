import { SIMPLE_DAGGERHEART_SYSTEM } from './config/system.js';
import { SimpleDHCardSheet } from './sheets/SimpleDHCardSheet.js';
import { SimpleDHCharacterSheet } from './sheets/SimpleDHCharacterSheet.js';
import { SimpleDHCharacter } from './data/SimpleDHCharacter.js';
import { SimpleDHCard } from './data/SimpleDHCard.js';

const { Items, Actors } = foundry.documents.collections;

function setupConfig() {
  CONFIG.SIMPLE_DAGGERHEART_SYSTEM = SIMPLE_DAGGERHEART_SYSTEM;
}

function registerDataModels() {
  CONFIG.Actor.dataModels.character = SimpleDHCharacter;
  CONFIG.Item.dataModels.card = SimpleDHCard;
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
      'systems/simple-daggerheart/src/templates/character-sheet/character-sheet-items.hbs',
    'simple-daggerheart.character-sheet.armor':
      'systems/simple-daggerheart/src/templates/character-sheet/character-sheet-armor.hbs'
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

  console.log('Simple Daggerheart System | Done Initializing');
});
