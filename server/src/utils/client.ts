import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export async function connectWithRetry() {
  const maxRetries = 5;
  let retries = 0;

  console.log("Connecting...");
  while (retries < maxRetries) {
    try {
      await prisma.$connect();
      console.log("Connected to the database!");
      break;
    } catch (error) {
      console.log(
        `Failed to connect to the database (attempt ${
          retries + 1
        } of ${maxRetries}):`
      );
      console.error(error);

      const retryDelay = 3000;
      await new Promise((resolve) => setTimeout(resolve, retryDelay));

      retries++;
    }
  }

  if (retries === maxRetries) {
    console.log(
      "Failed to connect to the database after multiple attempts. Exiting..."
    );
    process.exit(1); // Exit the process with an error code
  }
}

export default prisma;
