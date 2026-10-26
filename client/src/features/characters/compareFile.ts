
import { useState } from "react";
import { useCreateCharacterMutation } from "../api/characterApi";
import { useGetAllBackgroundsQuery } from "../../backgrounds/api/backgroundApi";
import { useGetAllSpeciesQuery } from "../../species/api/speciesApi";
import { useGetAllProfessionsQuery } from "../../professions/api/professionApi";
import {
  defaultCharacterFormData,
  defaultIdentity,
} from "../characterDefaults";
import type { CharacterInput } from "../charactersTypes";

export function CharacterForm() {
  const [form, setForm] = useState<CharacterInput>({
    ...defaultCharacterFormData,
    identity: { ...defaultIdentity, name: "Test Character" },
  });
  const { data: species } = useGetAllSpeciesQuery();
  const { data: backgrounds } = useGetAllBackgroundsQuery();
  const { data: professions } = useGetAllProfessionsQuery();
  const [createCharacter, { isLoading, error, data }] =
    useCreateCharacterMutation();

  console.log(professions);
  return (
    <div>
      <input
        value={form.identity.name}
        onChange={(e) =>
          setForm({
            ...form,
            identity: { ...form.identity, name: e.target.value },
          })
        }
      />

      <select
        value={form.origin.species ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            origin: { ...form.origin, species: e.target.value || undefined },
          })
        }
      >
        <option value="">Species</option>
        {(species ?? []).map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        value={form.origin.background ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            origin: { ...form.origin, background: e.target.value || undefined },
          })
        }
      >
        <option value="">Background</option>
        {(backgrounds ?? []).map((b) => (
          <option key={b._id} value={b._id}>
            {b.name}
          </option>
        ))}
      </select>

      <select
        value={form.archetype.profession ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            archetype: {
              ...form.archetype,
              profession: e.target.value || undefined,
            },
          })
        }
      >
        <option value="">Profession</option>
        {(professions ?? []).map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <button disabled={isLoading} onClick={() => createCharacter(form)}>
        Create
      </button>
      <pre>{JSON.stringify(error ?? data, null, 2)}</pre>
    </div>
  );
}
