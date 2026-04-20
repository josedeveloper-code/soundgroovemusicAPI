// middleware/logger.js

module.exports = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  const { method, originalUrl } = req;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    console.log(
      `[${timestamp}] ${method} ${originalUrl} - ${status} (${duration}ms) | IP: ${ip} | UA: ${userAgent}`
    );
  });

  next();
};
