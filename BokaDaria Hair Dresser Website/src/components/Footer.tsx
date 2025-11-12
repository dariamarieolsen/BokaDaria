export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <small>© {new Date().getFullYear()} BokaDaria</small>
        <small>Made with ❤️ in Malmö</small>
      </div>
    </footer>
  );
}
