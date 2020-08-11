declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    deliverer: {
      id: string;
    };
  }
}
