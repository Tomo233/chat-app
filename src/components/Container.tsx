import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="container mx-auto w-4/5">{children}</div>;
}

export default Container;
