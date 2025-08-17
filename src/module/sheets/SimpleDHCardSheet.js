const { api, sheets } = foundry.applications;

export class SimpleDHCardSheet extends api.HandlebarsApplicationMixin(
  sheets.ItemSheetV2
) {
  static DEFAULT_OPTIONS = {
    tag: 'form',
    classes: ['simple-daggerheart', 'card-sheet'],
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    position: {
      width: 480,
      height: 460
    }
  };

  static templatePrefix = 'systems/simple-daggerheart/src/templates/card-sheet';

  static PARTS = {
    header: {
      id: 'header',
      template: `${this.templatePrefix}/card-sheet-header.hbs`,
      classes: ['simple-daggerheart']
    },
    body: {
      id: 'body',
      template: `${this.templatePrefix}/card-sheet-body.hbs`,
      classes: ['simple-daggerheart']
    }
  };

  get title() {
    return game.i18n.localize('SIMPLE_DAGGERHEART.CardSheet.Header');
  }

  async _prepareContext(_options) {
    const context = await super._prepareContext(_options);

    context.description = {
      field: this.document.system.schema.fields.description,
      value: this.document.system.description,
      name: 'system.description'
    };

    return context;
  }
}
