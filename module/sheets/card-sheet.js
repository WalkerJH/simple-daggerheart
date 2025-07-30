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
      width: 400
    }
  };
}
