import { ReactNode } from 'react';

const DiscLi = ({ children }: { children: ReactNode }) => {
  return <li className="list-disc ml-5 mb-1">{children}</li>;
};
export default DiscLi;
