import assert from "node:assert/strict";
import { build } from "vite";

const result = await build({
  configFile: false,
  logLevel: "error",
  build: {
    ssr: "src/services/assistantAnswers.ts",
    write: false,
    minify: false,
  },
});
assert.ok(!Array.isArray(result) && "output" in result);
const chunk = result.output.find((item) => item.type === "chunk" && item.isEntry);
assert.ok(chunk, "The demo answer module bundles for execution");
const { answerDemoQuestion } = await import(
  `data:text/javascript;base64,${Buffer.from(chunk.code).toString("base64")}`
);

const experience = answerDemoQuestion("Tell me about your work experience");
assert.match(experience, /BALANCED\+/);
assert.match(experience, /Celestica/);
assert.match(experience, /Green P\.I\./);
assert.doesNotMatch(experience, /Northwind|Brightline|Kite & Co|seven years/);

const projects = answerDemoQuestion("What projects have you built?");
assert.match(projects, /Vitae AI/);
assert.match(projects, /Path to Recovery/);
assert.match(projects, /Indigenous Supports from KHP/);
assert.match(projects, /Handwritten Digit Classifier/);
assert.doesNotMatch(projects, /Ledger|Waypoint|Chatterbox/);

const skills = answerDemoQuestion("What's your tech stack?");
assert.match(skills, /C#|\.NET/);
assert.match(skills, /SQL Server/);
assert.doesNotMatch(skills, /PyTorch|FastAPI|Mongo/);

const fun = answerDemoQuestion("What do you do for fun?");
assert.match(fun, /905 Gunners FC/);
assert.match(fun, /FL Studio/);
assert.match(fun, /Travel/);
assert.doesNotMatch(fun, /espresso|bouldering|35mm/);

assert.match(answerDemoQuestion("Are you open to new opportunities?"), /markbarbuto@outlook\.com/);
assert.match(answerDemoQuestion("Where did you graduate?"), /University of Toronto/);
assert.match(answerDemoQuestion("Who is Mark Barbuto?"), /Software Developer/);
assert.match(answerDemoQuestion("Tell me about Path to Recovery"), /Supabase/);
assert.match(answerDemoQuestion("Tell me about Celestica"), /67%/);
assert.match(answerDemoQuestion("What music do you make?"), /FL Studio/);

for (const question of ["What is your salary?", "Where do you live?", "Who won the game?", "", "Explain networking"]) {
  assert.match(answerDemoQuestion(question), /does not have a supported answer/);
}

console.log("Assistant checks passed for published facts, suggested prompts, named topics, and unsupported questions.");
