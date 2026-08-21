import fs from "node:fs"
import path from "node:path"

const messagesDir = path.resolve("messages")
const files = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"))
const flatten = (value, prefix = "", result = {}) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) flatten(child, prefix ? `${prefix}.${key}` : key, result)
  } else {
    result[prefix] = { type: Array.isArray(value) ? "array" : typeof value, value }
  }
  return result
}

const catalogs = Object.fromEntries(files.map((file) => [file, JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf8"))]))
const english = flatten(catalogs["en.json"])
let failed = false

for (const file of files) {
  if (file === "en.json") continue
  const current = flatten(catalogs[file])
  const missing = Object.keys(english).filter((key) => !(key in current))
  const extra = Object.keys(current).filter((key) => !(key in english))
  const mismatched = Object.keys(english).filter((key) => key in current && english[key].type !== current[key].type)
  const pass = missing.length === 0 && extra.length === 0 && mismatched.length === 0
  console.log(`${file.replace(".json", "")}: ${pass ? "PASS" : "FAIL"}`)
  if (!pass) {
    failed = true
    if (missing.length) console.log(`  missing: ${missing.join(", ")}`)
    if (extra.length) console.log(`  extra: ${extra.join(", ")}`)
    if (mismatched.length) console.log(`  type mismatch: ${mismatched.join(", ")}`)
  }
}

if (failed) process.exitCode = 1
else console.log("All locale schemas match en.json")

const englishValues = flatten(catalogs["en.json"])
const suspicious = []
for (const file of files.filter((name) => name !== "en.json")) {
  const current = flatten(catalogs[file])
  for (const [key, value] of Object.entries(current)) {
    if (value.type === "string" && value.value.length > 40 && value.value === englishValues[key]?.value) suspicious.push(`${file}:${key}`)
  }
}
console.log(`Suspicious long English duplicates: ${suspicious.length}`)
if (suspicious.length) console.log(suspicious.join("\n"))
