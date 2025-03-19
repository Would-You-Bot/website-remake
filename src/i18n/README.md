# How to Set Up a New Locale

Follow these steps to add new locales:

1. **Update the `locales` Configuration**
     - Navigate to the [`data.ts`](./data.ts) file.
     - Create a new object like the ones already there, and make sure to confirm the flag code is correct. Check [this](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Decoding_table) for flag codes.

2. **Create the Locale File**
      - Copy the existing locale file template: [`locales/example.ts`](./locales/example.ts).
      - **Paste** the copied file and **rename it** to match your desired locale code (e.g., `fr.ts` for French).
      - Add your locale-specific translations and content to this new file.

3. **When Creating New Strings**
      - **Update the `types.ts`** file to include the new strings key.
      - Update all other language files with the new string key.
        - If you do not know the translation, use the english version.

## Verify and Test

After adding the new locale, make sure to **test** that the translations are working correctly.

## Usage

Copy the following example to use translations.

```tsx
import { useDictionary } from "@/i18n/hooks/use-dictionary";
/* ... */

export default function Home() {
  const { dict, isLoading } = useDictionary();

  return (
    /* ... */
    <span>{dict.random.string}</span>
    /* ... */
  )
}
```
