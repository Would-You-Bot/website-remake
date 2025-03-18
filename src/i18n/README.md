# How to Set Up a New Locale

Follow these steps to add a new locale to your project:

1. **Update the `locales` Configuration**
     - Navigate to the [`config.ts`](./config.ts) file.
     - In the `locales` variable, **add the new locale code** (e.g., `fr` for French) to the list of locales.

2. **Create the Locale File**
      - Copy the existing locale file template: [`locales/example.ts`](./locales/example.ts).
      - **Paste** the copied file and **rename it** to match your desired locale code (e.g., `fr.ts` for French).
      - Add your locale-specific translations and content to this new file.

3. **Update Locale Configuration**
      - Go back to [`config.ts`](./config.ts).
      - Add your newly created locale file (e.g., `fr.ts`) to the `locales` configuration so the system recognizes it.

4. **Ensure Type Safety for New Strings**
      - If you add new strings or translation keys to any locale, **update the `types.ts`** file to reflect the changes.
      - This will ensure that all locales adhere to the same structure and required keys.

## Verify and Test

After adding the new locale, make sure to **test** your application to verify that the translations are working correctly.
