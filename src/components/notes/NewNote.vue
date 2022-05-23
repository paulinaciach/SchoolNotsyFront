<template>
  <form @submit.prevent="submitData">
    <div class="textLables">
      <label>Temat:</label>
      <input type="text" v-model="enteredTopic" />
    </div>
    <div class="textLables">
      <label>Opis:</label>
      <textarea type="text" v-model="enteredDescription" />
    </div>
    <div class="textLables">
      <label>Kategoria:</label>
      <select name="category" id="category" v-model="entredCatgory">
        <option value="Matematyka">Matematyka</option>
        <option value="Polski">Polski</option>
        <option value="Angielski">Angielski</option>
        <option value="Fizyka">Fizyka</option>
        <option value="Chemia">Chemia</option>
        <option value="Informatyka">Informatyka</option>
        <option value="Inne">Inne</option>
      </select>
    </div>
    <div>
      <input type="file" @change="onFileSelected" />
    </div>
    <div>
      <button @click="onUpload">Dodaj notatke</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      enteredTopic: '',
      enteredDescription: '',
      entredCatgory: ''
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    onUpload() {
      const fd = new FormData();
      fd.append('Name', this.enteredTopic);
      fd.append('Description', this.enteredDescription);
      fd.append('Category', this.entredCatgory);
      fd.append('FormFile', this.selectedFile);

      axios.post('https://schoolnotes.azurewebsites.net/api/Files/createFile', fd).then(
        response => {
          console.log(response);
          alert('Notatka dodana!');
        },
        error => {
          console.log(error);
          alert('Ups... coś poszło nie tak :(');
        }
      );
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;

  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 25rem;
}
#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid black;
  background-color: black;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
  padding: 6px 32px;
  font-size: 14px;
}
#app button:hover,
#app button:active {
  background-color: black;
  border-color: black;
  color: #20b2aa;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
input,
select,
option,
textarea {
  font: inherit;
  padding: 0.15rem;
  display: inline-block;
  margin-left: 1rem;
  margin-right: 1rem;
}
label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
  text-align: left;
 
}
form div {
  margin: 1rem 0;
}
.textLables {
  text-align: left;
   vertical-align: top;
}
textarea {
  width: 12.5rem;
  height: 15rem;
  margin: 1em;
  resize: none;
}
</style>
