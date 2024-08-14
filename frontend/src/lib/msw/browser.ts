import {setupWorker} from "msw/browser";
import {handlers} from "@/lib/msw/handlers.ts";

const worker = setupWorker(...handlers);

export {worker}