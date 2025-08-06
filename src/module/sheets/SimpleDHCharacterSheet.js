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
      width: 840,
      height: 820
    },
    window: {
      resizable: true
    }
  };

  static templatePrefix =
    'systems/simple-daggerheart/src/templates/character-sheet';

  static PARTS = {
    header: {
      id: 'header',
      template: `${this.templatePrefix}/character-sheet-header.hbs`,
      classes: ['simple-daggerheart', 'character-sheet-section']
    },
    traits: {
      id: 'traits',
      template: `${this.templatePrefix}/character-sheet-traits.hbs`,
      classes: ['simple-daggerheart', 'character-sheet-section']
    },
    statColumns: {
      id: 'stat-columns',
      template: `${this.templatePrefix}/character-sheet-stat-columns.hbs`,
      classes: ['simple-daggerheart']
    }
  };

  get title() {
    return game.i18n.localize('Character Sheet');
  }

  async _prepareContext(_options) {
    const context = await super._prepareContext(_options);

    context.traits = CONFIG.SIMPLE_DAGGERHEART_SYSTEM.character.traits.map(
      (traitTemplate) => ({
        baseName: `system.traits.${traitTemplate.dataKey}`,
        label: `${traitTemplate.localizationKey}.Label`,
        examples: Array.from({ length: 3 }).map(
          (_val, index) =>
            `${traitTemplate.localizationKey}.Example${index + 1}`
        ),
        value: this.document.system.traits[traitTemplate.dataKey].value,
        marked: this.document.system.traits[traitTemplate.dataKey].marked
      })
    );

    context.experiences = Array.from({ length: 5 }).map((_value, index) => ({
      index,
      value: this.document.system.experiences[index]?.value,
      bonus: this.document.system.experiences[index]?.bonus
    }));

    return context;
  }
}
