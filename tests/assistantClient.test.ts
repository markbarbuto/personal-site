import assert from "node:assert/strict";
import { test } from "node:test";
import { readAssistantEvents } from "../src/services/assistantClient.ts";

const LF = 'event: token\ndata: {"text": "Hi."}\n\nevent: done\ndata: {"timings": {}}\n\n';
const EXPECTED = [
  { event: "token", data: { text: "Hi." } },
  { event: "done", data: { timings: {} } },
];

function stream(chunks: string[]) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
}

async function events(chunks: string[]) {
  const out = [];
  for await (const event of readAssistantEvents(stream(chunks))) out.push(event);
  return out;
}

test("LF line endings", async () => {
  assert.deepEqual(await events([LF]), EXPECTED);
});

test("CRLF line endings", async () => {
  assert.deepEqual(await events([LF.replaceAll("\n", "\r\n")]), EXPECTED);
});

test("CR line endings", async () => {
  assert.deepEqual(await events([LF.replaceAll("\n", "\r")]), EXPECTED);
});

test("a CRLF split across chunks counts once", async () => {
  const crlf = LF.replaceAll("\n", "\r\n");
  const splits = [...crlf.matchAll(/\r\n/g)].map((match) => match.index + 1);
  for (const at of splits) {
    assert.deepEqual(await events([crlf.slice(0, at), crlf.slice(at)]), EXPECTED, `split at ${at}`);
  }
});

test("a stream cut one byte at a time", async () => {
  const crlf = LF.replaceAll("\n", "\r\n");
  assert.deepEqual(await events([...crlf]), EXPECTED);
});
