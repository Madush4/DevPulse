import cors from "cors";

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Cors: origin ${origin} is not allowed.`));
    }
  },

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default cors(corsOptions);
