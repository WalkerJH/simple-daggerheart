const { api, sheets } = foundry.applications;

export class SimpleDHCharacterSheet extends api.HandlebarsApplicationMixin(
  sheets.CharacterSheetV2
) {
  static DEFAULT_OPTIONS = {
    tag: 'form',
    classes: ['simple-daggerheart', 'item-sheet'],
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    position: {
      width: 600
    }
  };
}
