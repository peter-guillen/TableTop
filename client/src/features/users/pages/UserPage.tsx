import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuInfo, LuMapPin, LuUser, LuUserPen } from "react-icons/lu";

import { useGetCurrentUserQuery } from "../../auth/api/authApi.tsx";
import { useUpdateMyProfileMutation } from "../api/userApi.tsx";
import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { UserProfile } from "../userTypes.ts";
import {
  formCard,
  formCheckbox,
  formCheckLabel,
  formHeading,
  formHint,
  formInput,
  formLabel,
  formTitle,
  ghostButton,
  inkAccent,
  inkDanger,
  inkMuted,
  primaryButton,
  surface,
} from "../../../shared/styles/theme.ts";

// Intl.supportedValuesOf works in every modern browser, but it isn't in the
// ES2021 types this project targets, so it needs a type cast here
const timeZones = (
  Intl as unknown as { supportedValuesOf: (key: string) => string[] }
).supportedValuesOf("timeZone");

export const UserPage = () => {
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    showName: false,
    pronouns: "",
    bio: "",
    location: "",
    timeZone: "",
  });

  const navigate = useNavigate();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();
  const [updateMyProfile, { isLoading: isSaving, isSuccess, isError }] =
    useUpdateMyProfileMutation();

  const { handleInputChange } = useFormHandlers(setFormData);

  // Fill the form once the current user loads; older accounts have no profile yet
  useEffect(() => {
    if (currentUser?.profile) {
      setFormData({ ...currentUser.profile });
    }
  }, [currentUser]);

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMyProfile(formData);
  };

  if (isLoading || !currentUser) return <p>Loading...</p>;

  const displayName =
    formData.showName && formData.name.trim()
      ? formData.name.trim()
      : currentUser.username;

  return (
    <div className={`min-h-screen p-6 ${surface}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <LuUserPen className={inkAccent} size={32} aria-hidden="true" />
            <h1 className={formTitle}>Your Profile</h1>
          </div>
          <p className={`capitalize ${inkMuted}`}>
            Signed in as {currentUser.username} &bull; {currentUser.role}
          </p>
        </div>

        {/* Optional Note */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
          <LuInfo className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
          <p className="text-sm">
            <strong>Everything on this page is optional.</strong> Fill in as
            much or as little as you like, and leave a field blank to remove it.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              {/* Display Name */}
              <section>
                <h2 className={formHeading}>
                  <LuUser size={20} aria-hidden="true" />
                  Display Name
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className={`${formLabel} mb-2`}>
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      maxLength={50}
                      placeholder="What should people call you?"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formInput}
                    />
                  </div>

                  <label className={formCheckLabel}>
                    <input
                      type="checkbox"
                      checked={formData.showName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          showName: e.target.checked,
                        }))
                      }
                      className={formCheckbox}
                    />
                    Show my name instead of my username
                  </label>
                  <p className={formHint}>
                    You'll appear as <strong>{displayName}</strong>.
                    {formData.showName &&
                      !formData.name.trim() &&
                      " Add a name above to use it."}
                  </p>
                </div>
              </section>

              {/* About You */}
              <section>
                <h2 className={formHeading}>
                  <LuInfo size={20} aria-hidden="true" />
                  About You
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="pronouns" className={`${formLabel} mb-2`}>
                      Pronouns
                    </label>
                    <input
                      id="pronouns"
                      type="text"
                      name="pronouns"
                      maxLength={30}
                      placeholder="e.g. they/them"
                      value={formData.pronouns}
                      onChange={handleInputChange}
                      className={formInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="bio" className={`${formLabel} mb-2`}>
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      maxLength={500}
                      placeholder="Favorite systems, play style, the character you can't stop playing..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      className={`${formInput} resize-none`}
                    />
                    <p className={`${formHint} text-right`}>
                      {formData.bio.length}/500
                    </p>
                  </div>
                </div>
              </section>

              {/* Location */}
              <section>
                <h2 className={formHeading}>
                  <LuMapPin size={20} aria-hidden="true" />
                  Location
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="location" className={`${formLabel} mb-2`}>
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      name="location"
                      maxLength={100}
                      placeholder="e.g. Portland, OR"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={formInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="timeZone" className={`${formLabel} mb-2`}>
                      Time Zone
                    </label>
                    <div className="flex gap-3">
                      <select
                        id="timeZone"
                        name="timeZone"
                        value={formData.timeZone}
                        onChange={handleInputChange}
                        className={formInput}
                      >
                        <option value="">Not set</option>
                        {timeZones.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            timeZone:
                              Intl.DateTimeFormat().resolvedOptions().timeZone,
                          }))
                        }
                        className={`shrink-0 px-4 py-3 ${ghostButton}`}
                      >
                        Use my time zone
                      </button>
                    </div>
                    <p className={formHint}>
                      Helps when scheduling campaigns with other players.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Save Status */}
          {isSuccess && (
            <p className={`mb-4 text-sm ${inkAccent}`} role="status">
              Profile saved.
            </p>
          )}
          {isError && (
            <p className={`mb-4 text-sm ${inkDanger}`} role="alert">
              Couldn't save your profile. Check that each field is within its
              length limit and try again.
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className={`${ghostButton} px-6 py-3`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`${primaryButton} px-8 py-3 disabled:opacity-50`}
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
