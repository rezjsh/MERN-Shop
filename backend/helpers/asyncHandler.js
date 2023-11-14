// Async handler function
const asyncHandler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };
};

export default asyncHandler;
