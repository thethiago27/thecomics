import { ReactNode } from "react";

interface StackGridProps {
  children: ReactNode;
  columns?: number;
}

const StackGrid = ({ columns, children }: StackGridProps) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: "2rem",
        marginTop: "3rem",
      }}
    >
      {children}
    </div>
  );
};

export default StackGrid;
