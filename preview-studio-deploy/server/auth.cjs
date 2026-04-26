const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET || "preview-studio-secret-key";

function parseDuration(d) {
  const match = String(d).match(/^(\d+)([dhms])$/);
  if (!match) return 7 * 24 * 60 * 60;
  const n = parseInt(match[1]);
  switch (match[2]) {
    case "d": return n * 24 * 60 * 60;
    case "h": return n * 60 * 60;
    case "m": return n * 60;
    case "s": return n;
    default: return 7 * 24 * 60 * 60;
  }
}

function signToken(payload, expiresIn = "7d") {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + parseDuration(expiresIn);
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  try {
    const [header, body, signature] = token.split(".");
    if (!header || !body || !signature) return null;
    const expected = crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64url");
    if (signature !== expected) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "未登录" });
  }
  const token = auth.slice(7);
  const payload = verifyToken(token);
  if (!payload || payload.role !== "admin") {
    return res.status(401).json({ error: "登录已过期或无效" });
  }
  req.admin = payload;
  next();
}

module.exports = { signToken, verifyToken, requireAuth };
