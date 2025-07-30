const { api, sheets } = foundry.applications;

export class SimpleDHCharacterSheet extends api.HandlebarsApplicationMixin(
  sheets.ActorSheetV2
) {
  static DEFAULT_OPTIONS = {
    tag: 'form',
    label: '',
    classes: ['simple-daggerheart', 'character-sheet'],
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    position: {
      width: 700,
      height: 800
    }
  };

  static PARTS = {
    header: {
      id: 'header',
      template:
        'systems/simple-daggerheart/templates/character-sheet/character-sheet-header.hbs'
    },
    stats: {
      id: 'stats',
      template:
        'systems/simple-daggerheart/templates/character-sheet/character-sheet-stats.hbs'
    }
  };

  get title() {
    return game.i18n.localize('Character Sheet');
  }
}
