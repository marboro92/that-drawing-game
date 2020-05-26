import { Machine } from "xstate";
import { assign } from "xstate/lib/actionTypes";

// The hierarchical schema for the states
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

type RoundEventContext = {
  contentArray: string[];
};

export const RoundMachine = Machine<
  RoundEventContext,
  RoundStateSchema,
  RoundEvent
>({
  id: "round",
  initial: "initial-text",
  context: {
    contentArray: [], //Array of texta nd images entered by the user sequentially in diff turns
  },
  states: {
    "initial-text": {
      on: {
        SUBMIT_SUCCESS: {
          target: "",
        },
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
