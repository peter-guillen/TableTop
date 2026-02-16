import { useContext } from "react";
import { ProfessionContext } from "../context/Temp-context";
import { ProfessionPreview } from "./ProfessionPreview";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";

export const ProfessionList = () => {
  const { professionList } = useContext(ProfessionContext);
  if (!professionList || professionList.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <ProfessionPreview />
        </div>
      </div>
    </>
  );
};
