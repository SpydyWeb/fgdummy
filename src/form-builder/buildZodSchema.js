import { z } from "zod";

export function buildZodSchema(config) {
  const shape = {};

  config.sections.forEach((section) => {
    section.fields.forEach((field) => {
      let schema = z.any();

      if (["text", "textarea", "email", "select"].includes(field.type)) {
        schema = z.string();
      }

      if (field.type === "file") {
        schema = z.array(z.instanceof(File));
      }

      if (!field.rules?.required) {
        schema = schema.optional();
      }

      if (field.rules?.min) {
        schema = schema.min(field.rules.min);
      }

      if (field.rules?.length) {
        schema = schema.length(field.rules.length);
      }

      if (field.rules?.numeric) {
        schema = schema.regex(/^\d+$/);
      }

      shape[field.name] = schema;
    });
  });

  return z.object(shape);
}
