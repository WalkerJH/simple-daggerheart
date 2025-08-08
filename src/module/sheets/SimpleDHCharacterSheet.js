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
    actions: { modifyHP: this.modifyHP },
    position: {
      width: 840,
      height: 840
    },
    window: {
      resizable: true,
      scrollable: true
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
    tabs: {
      template: 'templates/generic/tab-navigation.hbs',
      classes: ['simple-daggerheart']
    },
    statColumns: {
      id: 'stat-columns',
      template: `${this.templatePrefix}/character-sheet-stat-columns.hbs`,
      classes: ['simple-daggerheart']
    },
    inventory: {
      id: 'inventory',
      template: `${this.templatePrefix}/character-sheet-inventory.hbs`,
      classes: ['simple-daggerheart', 'character-sheet-section']
    },
    cards: {
      id: 'cards',
      template: `${this.templatePrefix}/character-sheet-cards.hbs`,
      classes: ['simple-daggerheart', 'character-sheet-section']
    }
  };

  static TABS = {
    primary: {
      tabs: [
        {
          id: 'status',
          icon: 'fas fa-user',
          tooltip: 'SIMPLE_DAGGERHEART.CharacterSheet.Tabs.Status'
        },
        {
          id: 'inventory',
          icon: 'fas fa-backpack',
          tooltip: 'SIMPLE_DAGGERHEART.CharacterSheet.Tabs.Inventory'
        },
        {
          id: 'cards',
          icon: 'fas fa-cards-blank',
          tooltip: 'SIMPLE_DAGGERHEART.CharacterSheet.Tabs.Cards'
        }
      ],
      initial: 'status'
    }
  };

  get title() {
    return game.i18n.localize('Character Sheet');
  }

  async _prepareContext(_options) {
    const context = await super._prepareContext(_options);

    context.tabs = this._prepareTabs('primary');

    context.traits = Object.entries(this.document.system.traits).map(
      ([traitKey, traitData]) => {
        const traitConfig =
          CONFIG.SIMPLE_DAGGERHEART_SYSTEM.character.traits[traitKey];
        return {
          baseName: `system.traits.${traitKey}`,
          label: `${traitConfig.localizationKey}.Label`,
          examples: Array.from({ length: 3 }).map(
            (_val, index) =>
              `${traitConfig.localizationKey}.Example${index + 1}`
          ),
          value: traitData.value,
          marked: traitData.marked
        };
      }
    );

    context.experiences = Array.from({ length: 5 }).map((_value, index) => ({
      index,
      name: this.document.system.experiences[index]?.name,
      bonus: this.document.system.experiences[index]?.bonus
    }));

    return context;
  }

  static async modifyHP(_, button) {
    const newHPValue =
      this.document.system.hp + parseInt(button.dataset.amount, 10);
    this.document.system.hp = newHPValue >= 0 ? newHPValue : 0;
    this.render();
  }
}
