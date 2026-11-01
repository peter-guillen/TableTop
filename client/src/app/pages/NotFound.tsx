import { LuMapPin, LuCircleArrowOutUpLeft } from "react-icons/lu";
import { ErrorPage } from "./ErrorPage.tsx";

export function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Quest Not Found"
      subtitle="You've wandered into uncharted territory, adventurer."
      message="The path you seek has been consumed by the darkness. Perhaps it never existed, or maybe it was destroyed by a rogue dragon. Either way, this location is lost to the void."
      location="The Abyss of Missing Pages"
      icon={LuCircleArrowOutUpLeft}
      locationIcon={LuMapPin}
    />
  );
}
