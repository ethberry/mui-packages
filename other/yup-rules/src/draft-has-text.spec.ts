import { object, string, ValidationError } from "yup";

import { emptyStateString, simpleFormatting } from "../../../../common-packages/react/draft-js-utils/src";

import "./draft-has-text";

const ERROR_MESSAGE = "ERROR_MESSAGE";

const schemaValidatorObject = object().shape({
  // @ts-ignore
  description: string().draftHasText(ERROR_MESSAGE),
});

describe("Draft", () => {
  it("has no text", async () => {
    await expect(
      schemaValidatorObject.validate({
        description: emptyStateString,
      }),
    ).rejects.toEqual(new ValidationError(ERROR_MESSAGE));
  });

  it("has text", async () => {
    await expect(
      schemaValidatorObject.validate({
        description: simpleFormatting,
      }),
    ).resolves.toEqual({
      description: simpleFormatting,
    });
  });
});
