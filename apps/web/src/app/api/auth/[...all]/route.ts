import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

function handlers() {
  return toNextJsHandler(getAuth());
}

export const GET = (request: Request) => handlers().GET(request);
export const POST = (request: Request) => handlers().POST(request);