import { useState } from "react";
import Validator from "../utils/Validator";
export function useFormGroup(initialState) {
  const updateFormControl = (
    value,
    state,
    validation = null,
    updatedByUser = false
  ) => {
    let obj = {
      ...state,
      value,
    };
    if (validation) {
      obj = {
        ...obj,
        validation: {
          ...obj.validation,
          ...validation,
        },
      };
    }
    if (updatedByUser) {
      obj["touched"] = true;
    }
    if (obj && obj.validation) {
      const validations = Validator.runValidator(value, obj.validation);
      const key = Object.keys(validations).find(
        (key) => validations[key] === false
      );
      if (key) {
        obj.error = true;
        if (updatedByUser) {
          obj.errorMessage =
            obj.validation && obj.validation.msgs && obj.validation.msgs[key]
              ? obj.validation.msgs[key]
              : "invalid";
        }
      } else {
        obj.error = false;
        obj.errorMessage = "";
      }
    }

    return obj;
  };

  const getUpdatedInitialState = (state) => {
    let updatedInitialState = { ...state };
    Object.keys(state).forEach((key) => {
      updatedInitialState = {
        ...updatedInitialState,
        [key]: updateFormControl(
          state[key] && state[key].value ? state[key].value : "",
          state[key]
        ),
      };
    });
    return updatedInitialState;
  };

  const [fields, setValues] = useState(getUpdatedInitialState(initialState));

  return [
    fields,
    function (event) {
      const nameOrId = event.target.id || event.target.name;
      setValues({
        ...fields,
        [nameOrId]: updateFormControl(
          event.target.value,
          fields[nameOrId],
          fields[nameOrId].validation,
          true
        ),
      });
    },
    function (control = null) {
      if (!control) {
        Object.keys(fields).forEach((key) => {
          fields[key].value = "";
        });
        setValues(getUpdatedInitialState(fields));
      } else {
        fields[control].value = "";
        setValues({ ...fields });
      }
    },
    function () {
      Object.keys(fields).forEach((key) => {
        fields[key] = updateFormControl(
          fields[key].value,
          fields[key],
          fields[key].validation,
          true
        );
      });
      setValues({ ...fields });
    },
  ];
}
