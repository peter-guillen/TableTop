/**
 * formReducers
 *
 * Reducer functions for a Redux slice managing form state globally.
 * Use these when form state needs to persist across navigation or
 * be accessible across multiple sections simultaneously.
 *
 * The primary use case in RPGHub is the CharacterBuilder — a compositional
 * form that pulls from multiple domains at once (spells, items, professions,
 * conditions) and has sections that all read and write shared state.
 *
 * Unlike useFormHandlers (which manages local useState), these reducers
 * live in the Redux store and survive component unmounts.
 *
 * Simpler CRUD forms (SpellForm, ItemForm) do not need this — local
 * useState via useFormHandlers is sufficient there.
 */
export const formReducers = {
  /**
   * Sets any top-level field on formData by name.
   * The workhorse reducer — handles most simple input changes.
   *
   * @param {string} field - The top-level key to update
   * @param {*} value - The new value
   */
  updateField(state, action) {
    const { field, value } = action.payload;
    state[field] = value;
  },

  /**
   * Adds or removes a string from an array field based on checkbox state.
   * Mirror of handleCheckedChange above, but for Redux slice usage.
   *
   * @param {string} field - The array field on state to update
   * @param {string} value - The item to add or remove
   * @param {boolean} checked - Whether the checkbox is checked
   */
  toggleArrayItem(state, action) {
    const { field, value, checked } = action.payload;
    if (checked) {
      state[field].push(value);
    } else {
      state[field] = state[field].filter((item) => item !== value);
    }
  },

  /**
   * Updates one field inside a nested object in state.
   * e.g. { objectName: "healthEffect", field: "dice", value: "1d6" }
   *
   * @param {string} objectName - The nested object key on state
   * @param {string} field - The field inside that object to update
   * @param {*} value - The new value
   */
  updateObjectField(state, action) {
    const { objectName, field, value } = action.payload;
    state[objectName][field] = value;
  },

  /**
   * Resets the entire form back to its initial state.
   * Returning initialState from a reducer replaces the slice entirely
   * rather than merging — Immer treats a return value as a full replacement.
   */
  resetForm() {
    return initialState;
  },
};
