// middleware/logger.js

// These logs will run only once when the server starts up
console.log("--------------------------------------------------");
console.log("🎶 Sound Groove Logger Middleware Initialized 🎶");
console.log("--------------------------------------------------");

module.exports = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toLocaleString(); // More readable than ISO

  const { method, originalUrl } = req;
  const ip = req.ip || req.connection.remoteAddress;

  // Wait for the response to finish before logging
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Use colors or symbols to make it easier to read in the terminal
    const statusSymbol = status >= 400 ? "❌" : "✅";

    console.log(
      `${statusSymbol} [${timestamp}] ${method} ${originalUrl} - Status: ${status} (${duration}ms) | IP: ${ip}`
    );
  });

  next();
};