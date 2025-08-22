// This is really only used to make the react fast reload functional.
// Components can only be exported via fast refresh and a separate file is needed for objects and such.

import { createContext } from "react";

export const ArticleContext = createContext();
