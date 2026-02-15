import { useContext } from "react";
import { ArmorContext } from "../context/ArmorContext";
import { ArmorPreview } from "./ArmorPreview";
// import { ArmorPreviewTest } from "./ArmorPreviewTest";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const ArmorList = () => {
  const { armorList } = useContext(ArmorContext);
  if (!armorList || armorList.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Armors
            </h1>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Armors so your enemies don't SLAY you!
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ArmorPreview />
            {/* <ArmorPreviewTest /> */}
          </div>
        </div>
      </div>
    </>
  );
};
