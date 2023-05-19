import Joi from "joi";
import tr from "./tr_TR.json";

const schemaFirma = Joi.object({
  unvan: Joi.string().required().label("Ünvan"),
  ad: Joi.string().required().label("Ad"),
  soyad: Joi.string().required().label("Soyad"),
  gsm: Joi.string().required().label("GSM"),
  vergi_dairesi: Joi.string(),
  vergi_numarasi: Joi.string(),
  il_id: Joi.string(),
  ilce_id: Joi.string(),
  adres: Joi.string(),
  mail: Joi.string().email({ tlds: { allow: false } }),
});

const validate = (sch, val) => {
  const result = sch.validate(val, {
    abortEarly: false,
    allowUnknown: false,
    messages: tr,
    errors: {
      language: "tr",
    },
  });

  let errors = [];
  if (result.error) {
    errors = result.error.details.map((d) => ({
      type: d.type,
      key: d.context.key,
      label: d.context.label,
      message: d.message,
    }));
  }

  console.table(errors);

  return errors;
};

export { validate, schemaFirma };
