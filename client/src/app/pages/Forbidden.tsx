import { LuLock, LuSkull } from "react-icons/lu";
import { ErrorPage } from "./ErrorPage.tsx";

export function Forbidden() {
  return (
    <ErrorPage
      code="403"
      title="Forbidden"
      subtitle="You've wandered into a restricted area, adventurer."
      message="The path you seek requires authorization you don't have. Turn back, or be placed in confinement."
      location="Restricted Area"
      icon={LuSkull}
      locationIcon={LuLock}
    />
  );
}
