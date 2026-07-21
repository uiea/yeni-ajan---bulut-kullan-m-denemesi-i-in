import { logger, schedules } from "@trigger.dev/sdk";

/**
 * Development-only test automation. It runs every five minutes while
 * `trigger.dev dev` is active, and gives the Trigger.dev dashboard a simple,
 * safe task to verify that the project connection and scheduler work.
 */
export const developmentHealthCheck = schedules.task({
  id: "development-health-check",
  cron: {
    pattern: "*/5 * * * *",
    timezone: "Europe/Istanbul",
    environments: ["DEVELOPMENT"],
  },
  run: async (payload) => {
    const result = {
      status: "ok" as const,
      ranAt: payload.timestamp.toISOString(),
      timezone: payload.timezone,
      nodeEnv: process.env.NODE_ENV ?? "development",
    };

    logger.log("Trigger.dev test automation completed", result);

    return result;
  },
});
