export default function NonCollapsibleNavbar({ children }) {
  return (
    <nav
      className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
      id="navbar-vertical"
      style={{ width: "calc(100% - 30px)", zIndex: "1" }}
    >
      {children}
    </nav>
  );
}
