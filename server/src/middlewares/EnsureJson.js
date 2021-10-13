export function ensureJson(req, res, next) {
  const contentJson = req.header('Content-Type');
  if (!contentJson || contentJson !== 'application/json')
    return res.status(403).json({
      error:
        "Request should have 'Content-Type' header with value 'application/json'",
    });

  next();
}
