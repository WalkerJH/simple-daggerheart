import { DataUtils } from '../utils/DataUtils.js';

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

  static templatePrefix =
    'systems/simple-daggerheart/src/templates/character-sheet';

  static PARTS = {
    header: {
      id: 'header',
      template: `${this.templatePrefix}/character-sheet-header.hbs`,
      classes: ['simple-daggerheart', 'character-sheet-section']
    },
    stats: {
      id: 'stats',
      template: `${this.templatePrefix}/character-sheet-stats.hbs`,
      classes: ['simple-daggerheart', 'character-sheet-section']
    },
    statuses: {
      id: 'statuses',
      template: `${this.templatePrefix}/character-sheet-statuses.hbs`,
      classes: ['simple-daggerheart', 'character-sheet-section']
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

    context.resourceArrays = {
      hp: DataUtils.resourceToArray(
        this.document.system.hp,
        this.document.system.schema.fields.hp.max
      ),
      stress: DataUtils.resourceToArray(
        this.document.system.stress,
        this.document.system.schema.fields.stress.max
      ),
      hope: DataUtils.resourceToArray(
        this.document.system.hope,
        this.document.system.schema.fields.hope.max
      ),
      markedArmorSlots: DataUtils.resourceToArray(
        this.document.system.markedArmorSlots,
        this.document.system.schema.fields.markedArmorSlots.max
      ),
      proficienty: DataUtils.resourceToArray(
        this.document.system.proficiency,
        this.document.system.schema.fields.proficiency.max
      )
    };

    return context;
  }
}
