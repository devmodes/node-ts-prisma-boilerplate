import config from "@utils/config";
import {
  NotFoundException,
  UnprocessableEntitiesException,
} from "@utils/exceptions";
import { prismaClient } from "@utils/prisma";
import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let account = await prismaClient.account.findFirst({
    where: { email },
  });

  if (account) {
    throw new UnprocessableEntitiesException("email is already taken", null);
  }

  account = await prismaClient.account.create({
    data: {
      email,
      password: hashSync(password, 10),
    },
  });

  return res.status(201).json({
    message: "Account created",
    data: account,
  });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let account = await prismaClient.account.findFirst({ where: { email } });

  if (!account) {
    throw new NotFoundException("Invalid email or password!");
  }

  if (!compareSync(password, account.password)) {
    throw new NotFoundException("Invalid email or password");
  }

  const token = jwt.sign(
    {
      account: {
        id: account.id,
        email: account.id,
        created_at: account.created_at,
        updated_at: account.updated_at,
      },
    },
    config("jwt.secret")
  );

  return res.status(200).json({
    account,
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  return res.status(200).json({ account: req.account });
};
