"use client";
import { useEffect, useState } from "react";
import useScrollListener from "@/hooks/useScrollListener";
import Container from "../container/container";
import HeaderTop from "./headerTop";
import HeaderBotton from "./headerBotton";

const Header = () => {
  const [navClassList, setNavClassList] = useState<any>([]);
  const scroll = useScrollListener();

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    if (scroll.y > 80 && scroll.y - scroll.lastY > 0)
      _classList.push("nav-bar--hidden");

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  return (
    <nav className={navClassList.join(" ")}>
      <Container>
        <HeaderTop />
        <HeaderBotton />
      </Container>
    </nav>

  );
}

export default Header;