const { BooleanField, NumberField, SchemaField } = foundry.data.fields;

const createResourceField = (options) => {
  const { initial, min, max } = options ?? {};

  return new NumberField({
    initial: initial ?? 0,
    min: min ?? -999,
    max: max ?? 999,
    integer: true
  });
};

const createAttributeField = () => {
  return new SchemaField({
    value: new NumberField({
      initial: 0,
      max: 99,
      min: -99,
      integer: true
    }),
    marked: new BooleanField({ initial: false })
  });
};

export const DataUtils = {
  createResourceField,
  createAttributeField
};
