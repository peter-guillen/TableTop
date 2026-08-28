import { useGetAllConditionsQuery } from "../../conditions/api/conditionApi";
import { useGetAllPowersQuery } from "../api/powerApi";

import { PowerPreview } from "./PowerPreview";

export const PowerList = () => {
  const { data: powers, isLoading, isError } = useGetAllPowersQuery();

  const {
    data: conditions = [],
    isLoading: loadingCondition,
    isError: errorCondition,
  } = useGetAllConditionsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;
  if (loadingCondition) return <p>Loading...</p>;
  if (errorCondition) return <p>Something went wrong</p>;
  const conditionsById = Object.fromEntries(conditions.map((c) => [c._id, c]));

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Powers
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Weave magic into your life
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-3/4">
            {powers && (
              <PowerPreview powers={powers} conditionsById={conditionsById} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
