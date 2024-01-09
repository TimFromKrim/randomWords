import PocketBase from "pocketbase";
import { DBip } from "./constants";

// Declaration

const pb = new PocketBase(DBip);

const button = document
  .querySelector("#submit")
  .addEventListener("click", showWords);
const input = document.querySelector("input");
const textarea = document.querySelector("#textarea");

// Get from DB

async function getFromDB() {
  const records = await pb.collection("words").getFullList({
    sort: "-created",
  });

  return records;
}

// Random generation

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Insert in text area

async function showWords() {
  const records = await getFromDB();
  textarea.value = "";

  for (let i = 0; i < input.value; i++) {
    let currentElem = getRandomInt(records.length - 1);

    for (let i = 0; i < records.length; i++) {
      if (records[currentElem].isAdded == false) {
        currentElem = getRandomInt(records.length - 1);
      } else {
        break;
      }
    }

    textarea.value += `${records[currentElem].word}\n`;
    updateData(records[currentElem]);
  }
}

async function updateData(elem) {
  elem.isAdded = true;
  console.log(`${elem.id} has been updated`);

  try {
    await pb.collection("words").update(elem.id, elem);
  } catch (err) {
    alert(err);
    alert(`${elem} has not been updated`);
  }
}
