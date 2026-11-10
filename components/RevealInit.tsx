"use client";

import { useReveal } from "./useReveal";

/** Mounts the global GSAP motion controller once. Renders nothing. */
export function RevealInit() {
  useReveal();
  return null;
}
