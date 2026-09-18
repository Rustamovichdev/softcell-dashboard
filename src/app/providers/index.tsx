import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../../store";

type ProvidersProps = {
  children: ReactNode;
};

/** Global provider'lar (hozircha Redux store) */
const Providers: FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;

