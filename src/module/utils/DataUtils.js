const { BooleanField, NumberField, SchemaField, ArrayField } =
  foundry.data.fields;

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
    modifications: new ArrayField(
      new NumberField({
        initial: 0,
        max: 99,
        min: -99,
        integer: true
      })
    ),
    marked: new BooleanField({ initial: false })
  });
};

export const resourceToArray = (current, max) =>
  Array.from({ length: max }).map((_val, index) =>
    index <= current ? true : false
  );

export const DataUtils = {
  createResourceField,
  createAttributeField,
  resourceToArray
};
