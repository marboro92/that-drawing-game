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
type RoundEvent = { type: "SUBMIT_SUCCESS" } | { type: "SUBMIT_SUCCESS_FINAL" };

export const RoundMachine = Machine<RoundStateSchema, RoundEvent>({
  id: "round",
  initial: "initial-text",
  states: {
    "initial-text": {
      on: {
        SUBMIT_SUCCESS: "draw-image-for-text",
      },
    },
    "draw-image-for-text": {
      on: {
        SUBMIT_SUCCESS: "write-text-for-image",
      },
    },
    "write-text-for-image": {
      on: {
        SUBMIT_SUCCESS: "draw-image-for-text",
        SUBMIT_SUCCESS_FINAL: "final-text",
      },
    },
    "final-text": {
      type: "final",
    },
  },
});
