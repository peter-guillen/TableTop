import { ArmorPreview } from "./ArmorPreview";
import { useGetAllArmorsQuery } from "../api/armorApi";

export const ArmorList = () => {
  const { data: armors, isLoading, isError } = useGetAllArmorsQuery();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
              Armors
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-300">
              Armors so your enemies do not SLAY you!
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ArmorPreview key={armors._id} armors={armors} />
          </div>
        </div>
      </div>
    </>
  );
};
