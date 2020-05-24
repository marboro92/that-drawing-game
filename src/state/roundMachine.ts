import { Machine } from "xstate";

// The hierarchical (recursive) schema for the states
interface RoundStateSchema {
  states: {
    "initial-text": {};
    "draw-image-for-text": {};
    "write-text-for-image": {};
    "final-text": {};
  };
}

// The events that the machine handles
type RoundEvent =
  | { type: "INTIAL" }
  | { type: "IN_PROGRESS" }
  | { type: "FINAL" };

// The context (extended state) of the machine
// interface RoundContext {
//   elapsed: number;
// }

export const RoundMachine = Machine<null, RoundStateSchema, RoundEvent>({
  id: "round",
  initial: "initial-text",
  states: {
    "initial-text": {
      on: {},
    },
    "draw-image-for-text": {
      on: {},
    },
    "write-text-for-image": {
      on: {},
    },
    "final-text": {
      type: "final",
    },
  },
});
