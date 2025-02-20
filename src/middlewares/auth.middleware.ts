import { Account } from "@prisma/client";
import config from "@utils/config";
import { UnauthorizedException } from "@utils/exceptions";
import { prismaClient } from "@utils/prisma";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization as string;

    if (!token) {
      next(new UnauthorizedException());
    }

    const payload = jwt.verify(token, config("jwt.secret")) as jwt.JwtPayload;

    const account = await prismaClient.account.findFirst({
      where: { id: payload.account?.id },
    });

    if (!account) {
      return next(new UnauthorizedException());
    }

    req.account = account as Account;

    next();
  } catch (error: any) {
    next(new UnauthorizedException());
  }
};
