import { logger, task, wait } from "@trigger.dev/sdk";

/**
 * Trigger this from a server-side button handler. The task waits without
 * blocking a worker, then returns the text to display in the UI.
 */
export const helloAfterFiveSeconds = task({
  id: "hello-after-five-seconds",
  run: async () => {
    await wait.for({ seconds: 5 });

    const message = "Hello world";
    logger.log(message);

    return { message };
  },
});
