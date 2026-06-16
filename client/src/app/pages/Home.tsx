import { LandingPage } from "./LandingPage.tsx";
import { Header } from "../layouts/Header.tsx";
import { Footer } from "../layouts/Footer.tsx";

export const Home = () => {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
};
