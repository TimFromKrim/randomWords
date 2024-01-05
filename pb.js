import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
const button = document
  .querySelector("#submit")
  .addEventListener("click", showWords);
const input = document.querySelector("input");
const textarea = document.querySelector("#textarea");

const records = await pb.collection("words").getFullList({
  sort: "-created",
});

function showWords() {
  textarea.value = "";
  for (let i = 0; i < input.value; i++) {
    console.log(records[i].word);
    textarea.value += `${records[i].word}\n`;
  }
}
