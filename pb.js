import PocketBase from "pocketbase";

// Declaration

const pb = new PocketBase("http://127.0.0.1:8090");

const button = document
  .querySelector("#submit")
  .addEventListener("click", showWords);
const input = document.querySelector("input");
const textarea = document.querySelector("#textarea");

// Get from DB

const records = await pb.collection("words").getFullList({
  sort: "-created",
});

// Random generation

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Insert in text area

function showWords() {
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
