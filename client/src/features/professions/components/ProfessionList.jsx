import { useContext } from "react";
import { ProfessionContext } from "../context/ProfessionContext";
import { ProfessionPreview } from "./ProfessionPreview";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const ProfessionList = () => {
  const { professionList } = useContext(ProfessionContext);
  if (!professionList || professionList.length === 0) {
    return <LoadingSpinner />;
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
            <ProfessionPreview />
          </div>
        </div>
      </div>
    </>
  );
};
