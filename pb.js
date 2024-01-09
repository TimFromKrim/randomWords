import PocketBase from "pocketbase";

// Declaration

const pb = new PocketBase(import.meta.env.VITE_DB_IP);
pb.autoCancellation(false);

const button = document.querySelector("#submit");
button.addEventListener("click", showWords);
const input = document.querySelector("input");
const textarea = document.querySelector("#textarea");

// Get from DB

async function getFromDB() {
  const record = await pb.collection("words").getFirstListItem(`isAdded="0"`, {
    sort: "@random",
  });

  return record;
}

// Random generation

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Insert in text area

async function showWords() {
  button.disabled = true;
  textarea.value = "";

  for (let i = 0; i < input.value; i++) {
    try {
      const res = await getFromDB();

      textarea.value += `${res.word}\n`;
      console.log(res.word);

      res.isAdded = true;
      await pb.collection("words").update(res.id, res);

      const test = await pb.collection("words").getOne(res.id);
      if (test.isAdded) {
        console.log(`"\x1B[34m${test.word}"`, "marked successfully");
      }
    } catch {
      i--;
      continue;
    }
  }
  button.disabled = false;
}
