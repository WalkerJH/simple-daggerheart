const { api, sheets } = foundry.applications;

export class SimpleDHCharacterSheet extends api.HandlebarsApplicationMixin(
  sheets.ActorSheetV2
) {
  static DEFAULT_OPTIONS = {
    tag: 'form',
    label: '',
    classes: ['simple-daggerheart', 'character-sheet'],
    form: {
      submitOnChange: false,
      closeOnSubmit: false
    },
    actions: {
      modifyHP: this.modifyHP,
      addExperience: this.addExperience,
      removeExperience: this.removeExperience,
      addFeature: this.addFeature,
      removeFeature: this.removeFeature
    },
    position: {
      width: 800,
      height: 800
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
      classes: ['simple-daggerheart']
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
    characterTab: {
      id: 'character-tab',
      template: `${this.templatePrefix}/character-sheet-character-tab.hbs`,
      classes: ['simple-daggerheart']
    },
    inventory: {
      id: 'inventory',
      template: `${this.templatePrefix}/character-sheet-inventory.hbs`,
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
          id: 'status',
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

    context.features = await Promise.all(
      this.document.system.features.map(async (feature, index) => {
        const descriptionField =
          this.document.system.schema.fields.features.element.fields
            .description;
        const descriptionName = `system.features.${index}.description`;

        return {
          name: feature.name,
          description: feature.description,
          descriptionField,
          descriptionName
        };
      })
    );

    return context;
  }

  static async modifyHP(_, button) {
    let hp = this.document.system.hp + parseInt(button.dataset.amount, 10);
    if (hp < 0) hp = 0;
    await this.submit({
      updateData: {
        'system.hp': hp
      }
    });
    this.render();
  }

  static async addExperience() {
    await this.submit({
      updateData: {
        [`system.experiences.${this.document.system.experiences.length}`]: {
          name: '',
          bonus: null
        }
      }
    });
    this.render();
  }

  static async removeExperience(_, button) {
    const index = parseInt(button.dataset.index, 10);
    await this.submit({
      updateData: {
        'system.experiences': this.document.system.experiences.filter(
          (_experience, experienceIndex) => experienceIndex !== index
        )
      }
    });
    this.render();
  }

  static async addFeature() {
    await this.submit({
      updateData: {
        [`system.features.${this.document.system.features.length}`]: {
          name: '',
          description: ''
        }
      }
    });
    this.render();
  }

  static async removeFeature(_, button) {
    const index = parseInt(button.dataset.index, 10);
    await this.submit({
      updateData: {
        'system.features': this.document.system.features.filter(
          (_feature, featureIndex) => featureIndex !== index
        )
      }
    });
    await this.submit();
    this.render();
  }
}
