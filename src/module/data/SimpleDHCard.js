const { TypeDataModel } = foundry.abstract;

export class SimpleDHCard extends TypeDataModel {
  static defineSchema() {
    const { StringField, NumberField, HTMLField } = foundry.data.fields;

    return {
      name: new StringField(),
      level: new NumberField({ initial: 0, integer: true, min: 0 }),
      domain: new StringField(),
      type: new StringField(),
      recallCost: new NumberField({ initial: 0, integer: true, min: 0 }),
      description: new HTMLField()
    };
  }
}
