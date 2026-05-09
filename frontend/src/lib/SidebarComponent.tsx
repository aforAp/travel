import {ReactNode} from "react";

type SidebarProps = {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: (value: boolean) => void 
};

const SidebarComponent = ({
    setIsOpen,
  isOpen,
  children,
}: SidebarProps) => {
  return (
    <>
      {/* BACKDROP */}
      <div
        className={`
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-sm
          transition-opacity duration-500 ease-in-out
          ${
            isOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[270px]
          bg-white
          transition-transform delay-5000 duration-5000 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {children}
      </aside>
    </>
  );
};

export default SidebarComponent;
