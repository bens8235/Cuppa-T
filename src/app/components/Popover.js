"use client";
import * as Popover from "@radix-ui/react-popover";
import "./popover.css";
import Link from "next/link";

export default function PopOver() {
  return (
    <Popover.Root>
      <Popover.Trigger className="PopoverTrigger">Profile</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent">
          <Link href="/profile">My profile</Link>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
