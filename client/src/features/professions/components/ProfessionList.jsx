import { ProfessionPreview } from "./ProfessionPreview";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { useGetProfessionsQuery } from "../api/professionApi";

export const ProfessionList = () => {
  const { data: professions, isLoading, isError } = useGetProfessionsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-red-500">Error fetching professions</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Classes
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Choose the path you will walk
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-3/4">
            <ProfessionPreview
              keys={professions._id}
              professions={professions}
            />
          </div>
        </div>
      </div>
    </>
  );
};
