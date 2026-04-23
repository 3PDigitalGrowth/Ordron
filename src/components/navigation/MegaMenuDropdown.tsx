"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { DropdownDef } from "./nav-config";
import { MegaMenuColumn } from "./MegaMenuColumn";
import { MegaMenuLeadMagnet } from "./MegaMenuLeadMagnet";

type Props = {
  def: DropdownDef;
  panelId: string;
  triggerId: string;
  open: boolean;
  onNavigate: () => void;
};

export const MegaMenuDropdown = forwardRef<HTMLDivElement, Props>(
  function MegaMenuDropdown(
    { def, panelId, triggerId, open, onNavigate },
    ref,
  ) {
    const reduceMotion = useReducedMotion();
    const duration = reduceMotion ? 0 : 0.15;

    return (
      <motion.div
        ref={ref}
        id={panelId}
        role="menu"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        data-state={open ? "open" : "closed"}
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          y: open || reduceMotion ? 0 : -6,
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
        }}
        transition={{ duration, ease: "easeOut" }}
        className={cn(
          "fixed left-0 right-0 top-[72px] z-40",
          "border-b border-line-soft bg-surface-2",
          "rounded-b-lg shadow-soft",
        )}
      >
        <Container className="py-8">
          <div className="grid grid-cols-4 gap-8">
            {def.columns.map((column) => (
              <MegaMenuColumn
                key={column.title}
                column={column}
                onNavigate={onNavigate}
              />
            ))}
            <MegaMenuLeadMagnet
              card={def.leadMagnet}
              onNavigate={onNavigate}
            />
          </div>
        </Container>
      </motion.div>
    );
  },
);
