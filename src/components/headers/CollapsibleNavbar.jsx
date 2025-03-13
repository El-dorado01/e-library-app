
export default function CollapsibleNavbar({children}) {
  return (
    <nav
      className="collapse show navbar navbar-vertical navbar-light
        align-items-start p-0 border border-top-0 border-bottom-0"
      id="navbar-vertical"
    >
      {children}
    </nav>
  );
}
