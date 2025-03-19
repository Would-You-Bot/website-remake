# How to Set Up a New Locale

Follow these steps to add a new locale to your project:

1. **Update the `locales` Configuration**
     - Navigate to the [`data.ts`](./data.ts) file.
     - Create a new object like the ones already there, and make sure to confirm the flag code is correct. Check [this](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Decoding_table) for flag codes.

2. **Create the Locale File**
      - Copy the existing locale file template: [`locales/example.ts`](./locales/example.ts).
      - **Paste** the copied file and **rename it** to match your desired locale code (e.g., `fr.ts` for French).
      - Add your locale-specific translations and content to this new file.

3. **Ensure Type Safety for New Strings**
      - If you add new strings or translation keys to any locale, **update the `types.ts`** file to reflect the changes.
      - This will ensure that all locales adhere to the same structure and required keys.

## Verify and Test

After adding the new locale, make sure to **test** your application to verify that the translations are working correctly.

## Usage

To use the dictionary on the pages you want, use the following example:

```tsx
import { useDictionary } from "@/i18n/hooks/use-dictionary";
/* ... */

export default function Home() {
  const { dictionary, isLoading } = useDictionary();

  return (
    /* ... */
    <span>{dictionary.random.string}</span>
    /* ... */
  )
}
```
