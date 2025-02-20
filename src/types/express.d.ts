import express from "express";
import { Account } from "@prisma/client";

declare module "express" {
  export interface Request {
    account?: Account;
  }
}
