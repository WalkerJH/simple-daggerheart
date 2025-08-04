import { DataUtils } from '../utils/DataUtils.js';

const { TypeDataModel } = foundry.abstract;

export class SimpleDHCharacter extends TypeDataModel {
  static defineSchema() {
    const { StringField, NumberField, ArrayField, SchemaField } =
      foundry.data.fields;
    const { createResourceField, createAttributeField } = DataUtils;

    return {
      pronouns: new StringField(),
      ancestry: new StringField(),
      class: new StringField(),
      domains: new ArrayField(new StringField()),
      subclass: new StringField(),
      biography: new StringField(),

      level: createResourceField({ initial: 1, min: 1, max: 10 }),
      hp: createResourceField({ initial: 1, min: 0, max: 10 }),
      maxHp: createResourceField({ initial: 5, min: 0, max: 10 }),
      stress: createResourceField({ min: 0, max: 12 }),
      maxStress: createResourceField({ initial: 6, min: 0, max: 12 }),
      hope: createResourceField({ min: 0, max: 6 }),
      evasion: createResourceField({ initial: 1, min: 1, max: 30 }),
      proficiency: createResourceField({ initial: 1, min: 1, max: 6 }),

      traits: new SchemaField({
        agility: createAttributeField(),
        strength: createAttributeField(),
        finesse: createAttributeField(),
        instinct: createAttributeField(),
        presence: createAttributeField(),
        knowledge: createAttributeField()
      }),

      features: new ArrayField(new StringField()),
      experiences: new ArrayField(
        new SchemaField({
          name: new StringField(),
          bonus: createResourceField()
        })
      ),
      items: new ArrayField(new StringField()),
      weapons: new ArrayField(
        new SchemaField({
          name: new StringField(),
          trait: new StringField(),
          range: new StringField(),
          damageDice: new StringField(),
          feature: new StringField()
        })
      ),
      activeWeaponIndex: new NumberField({ min: 0, max: 3, integer: true }),
      armor: new SchemaField({
        name: new StringField(),
        minorThreshold: createResourceField({ min: 0 }),
        majorThreshold: createResourceField({ min: 0 }),
        currentScore: createResourceField({ min: 0 }),
        maxScore: createResourceField({ initial: 1, min: 0 })
      })
    };
  }
}
