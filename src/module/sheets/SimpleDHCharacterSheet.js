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
    actions: {
      modifyHP: this.modifyHP,
      addExperience: this.addExperience,
      removeExperience: this.removeExperience,
      addFeature: this.addFeature,
      removeFeature: this.removeFeature,
      addWeapon: this.addWeapon,
      removeWeapon: this.removeWeapon,
      addItem: this.addItem,
      removeItem: this.removeItem,
      addJournalPage: this.addJournalPage,
      modifyActiveJournalPage: this.modifyActiveJournalPage,
      removeJournalPage: this.removeJournalPage
    },
    position: {
      width: 800,
      height: 800
    },
    window: {
      resizable: true,
      minimizable: false
    }
  };

  static templatePrefix =
    'systems/simple-daggerheart/src/templates/character-sheet';

  static PARTS = {
    header: {
      id: 'header',
      template: `${this.templatePrefix}/character-sheet-header.hbs`,
      classes: ['simple-daggerheart'],
      scrollable: ['.character-experiences-list', '.character-features-list']
    },
    traits: {
      id: 'traits',
      template: `${this.templatePrefix}/character-sheet-traits.hbs`,
      classes: ['simple-daggerheart']
    },
    tabs: {
      template: 'templates/generic/tab-navigation.hbs',
      classes: ['simple-daggerheart']
    },
    character: {
      id: 'character',
      template: `${this.templatePrefix}/character-sheet-character-tab.hbs`,
      classes: ['simple-daggerheart']
    },
    inventory: {
      id: 'inventory',
      template: `${this.templatePrefix}/character-sheet-inventory-tab.hbs`,
      classes: ['simple-daggerheart']
    },
    cards: {
      id: 'cards',
      template: `${this.templatePrefix}/character-sheet-cards.hbs`,
      classes: ['simple-daggerheart']
    },
    notes: {
      id: 'notes',
      template: `${this.templatePrefix}/character-sheet-notes.hbs`,
      classes: ['simple-daggerheart']
    }
  };

  static TABS = {
    primary: {
      tabs: [
        {
          id: 'character',
          icon: 'fas fa-user',
          label: 'SIMPLE_DAGGERHEART.CharacterSheet.Tabs.Character'
        },
        {
          id: 'inventory',
          icon: 'fas fa-backpack',
          label: 'SIMPLE_DAGGERHEART.CharacterSheet.Tabs.Inventory'
        },
        {
          id: 'cards',
          icon: 'fas fa-cards-blank',
          label: 'SIMPLE_DAGGERHEART.CharacterSheet.Tabs.Cards'
        },
        {
          id: 'notes',
          icon: 'fas fa-scroll',
          label: 'SIMPLE_DAGGERHEART.CharacterSheet.Tabs.Notes'
        }
      ],
      initial: 'character'
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

    context.features = await Promise.all(
      this.document.system.features.map(async (feature, index) => {
        const descriptionField =
          this.document.system.schema.fields.features.element.fields
            .description;
        const descriptionName = `system.features.${index}.description`;

        return {
          ...feature,
          descriptionField,
          descriptionName
        };
      })
    );

    context.weapons = await Promise.all(
      this.document.system.weapons.map(async (weapon, index) => {
        const descriptionField =
          this.document.system.schema.fields.weapons.element.fields.description;
        const descriptionName = `system.weapons.${index}.description`;

        return {
          ...weapon,
          descriptionField,
          descriptionName
        };
      })
    );

    context.items = await Promise.all(
      this.document.system.items.map(async (item, index) => {
        const descriptionField =
          this.document.system.schema.fields.items.element.fields.description;
        const descriptionName = `system.items.${index}.description`;

        return {
          ...item,
          descriptionField,
          descriptionName
        };
      })
    );

    context.biography = {
      field: this.document.system.schema.fields.biography,
      value: this.document.system.biography,
      name: 'system.biography'
    };

    context.connections = {
      field: this.document.system.schema.fields.connections,
      value: this.document.system.connections,
      name: 'system.connections'
    };

    context.journal = {
      field: this.document.system.schema.fields.journal,
      value: this.document.system.journal,
      name: 'system.journal'
    };

    return context;
  }

  appendItemToSystemArray(key, item) {
    this.submit({
      updateData: {
        [`system.${key}.${this.document.system[key].length}`]: item
      }
    });
  }

  removeItemFromSystemArray(key, index) {
    this.submit({
      updateData: {
        [`system.${key}`]: this.document.system[key].filter(
          (_item, itemIndex) => itemIndex !== index
        )
      }
    });
  }

  static modifyHP(_, button) {
    let hp = this.document.system.hp + parseInt(button.dataset.amount, 10);
    if (hp < 0) hp = 0;
    this.submit({
      updateData: {
        'system.hp': hp
      }
    });
  }

  static addExperience() {
    this.appendItemToSystemArray('experiences', { name: '', bonus: null });
  }

  static removeExperience(_, button) {
    this.removeItemFromSystemArray(
      'experiences',
      parseInt(button.dataset.index, 10)
    );
  }

  static addFeature() {
    this.appendItemToSystemArray('features', { name: '', description: '' });
  }

  static removeFeature(_, button) {
    this.removeItemFromSystemArray(
      'features',
      parseInt(button.dataset.index, 10)
    );
  }

  static addWeapon() {
    this.appendItemToSystemArray('weapons', {
      name: '',
      trait: '',
      range: '',
      damageDice: '',
      feature: '',
      primary: false,
      secondary: false,
      burden: ''
    });
  }

  static removeWeapon(_, button) {
    this.removeItemFromSystemArray(
      'weapons',
      parseInt(button.dataset.index, 10)
    );
  }

  static addItem() {
    this.appendItemToSystemArray('items', {
      name: '',
      amount: 1,
      description: ''
    });
  }

  static removeItem(_, button) {
    this.removeItemFromSystemArray('items', parseInt(button.dataset.index, 10));
  }
}
