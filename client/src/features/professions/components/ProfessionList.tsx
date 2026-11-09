import { ProfessionPreview } from "./ProfessionPreview";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { useGetAllProfessionsQuery } from "../api/professionApi";

export const ProfessionList = () => {
  const { data: professions, isLoading, isError } = useGetAllProfessionsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div className="text-red-500">Error fetching professions</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
              Classes
            </h1>
            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300">
              Choose the path you will walk
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full lg:w-3/4">
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
