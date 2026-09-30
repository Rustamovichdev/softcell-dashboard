import type { FC } from "react";
import TextSizeSection from "./components/TextSizeSection";
import ThemeSection from "./components/ThemeSection";

const Settings: FC = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <h1 className="text-lg font-semibold sm:text-xl">Settings</h1>
      <ThemeSection />
      <TextSizeSection />
    </div>
  );
};

export default Settings;