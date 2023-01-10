import { Request, Response } from "express";
export default function HandleError(
  func: (req: Request, res: Response) => Promise<any>
) {
  return function RouteHandler(req: Request, res: Response) {
    func(req, res).catch((error) => {
      let message = "Oooops sth went wrong";
      if (error instanceof Error) message = error.message;
      res.send({ success: false, message });
      return;
    });
  };
}
