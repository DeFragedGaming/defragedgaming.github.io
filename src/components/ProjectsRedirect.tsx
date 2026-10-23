import React, { useEffect } from "react";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";

export default function ProjectsRedirect() {
  const history = useHistory();

  useEffect(() => {
    history.replace("/projects");
  }, [history]);

  return (
    <p>
      Taking you to the <Link to="/projects">Projects page</Link>…
    </p>
  );
}
