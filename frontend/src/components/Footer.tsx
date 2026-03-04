const Footer = () => {
  return (
    <footer className="py-3 border-t border-border">
      <div className="container flex flex-col md:flex-row items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
