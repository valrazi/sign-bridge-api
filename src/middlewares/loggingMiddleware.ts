import { Request, Response, NextFunction } from "express";

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  
  const originalSend = res.send;

  res.send = function (body) {
    
    console.log(`Outgoing Response: ${res.statusCode}`);
    console.log("Response Body:", body);

    
    return originalSend.call(this, body);
  };

  next();
};
