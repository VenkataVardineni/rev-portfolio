# Using Your Own 3D Character

The landing section loads a 3D character model. By default it uses the built-in character; you can replace it with **your own 3D model** without changing the profile photo.

## Quick steps

1. **Export your character as GLB**
   - From Blender, Maya, or any 3D tool: export as **.glb** (or .gltf).
   - Optional: use **Draco** compression to reduce file size (the site already has the Draco decoder).

2. **Name the file**
   - Name your file: **`custom-character.glb`**

3. **Put it in the project**
   - Place the file at:
   ```text
   public/models/custom-character.glb
   ```
   - If the folder `public/models/` doesn’t exist, create it.

4. **Run the site**
   - The app will load `custom-character.glb` first.
   - If that file is missing, it falls back to the original character.

## Optional: match the original behavior

The default character uses these **bone/object names** for extra behavior. Your model will still work without them; these are only for:

| Name        | Purpose                          |
|------------|-----------------------------------|
| `spine006` | Head follows mouse                |
| `spine005` | Neck in scroll animation          |
| `footR`, `footL` | Foot position fix           |
| `screenlight` | Screen glow effect            |
| `Plane004` / `Material.018` | Monitor/laptop screen |

**Animations** (if present in your GLB):

- `introAnimation` – plays on load (or the first animation is used).
- `Blink` – plays after intro.
- `key1`, `key2`, `key5`, `key6` – idle loops.
- `typing` – typing motion (uses bone names from `boneData.ts`).
- `browup` – eyebrow raise on hover over the character.

If your rig uses different names, you can either rename bones in your 3D tool to match, or ignore this; the site will still run and scroll, with fewer optional effects.

## Using a different path or filename

To use another path (e.g. `my-avatar.glb`), change the constant in:

**`src/components/Character/utils/character.ts`**

```ts
const CUSTOM_MODEL_PATH = "/models/custom-character.glb";
```

Change it to your path, e.g.:

```ts
const CUSTOM_MODEL_PATH = "/models/my-avatar.glb";
```

Your file should then be at `public/models/my-avatar.glb`.
