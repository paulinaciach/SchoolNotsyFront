<template>
  <li class="liCustom">
    <h2>{{ topic }}</h2>
    <h3>{{ category }}</h3>
    <div class="ulCustom">
      <p class="opis">
        <strong>Opis:</strong>
        {{ description }}
      </p>
      <button style="margin:5px" @click="$emit('download', id, fileUploadName)">
        Pobierz
      </button>
      <button @click="toggleDetails2">
        {{ detailsAreVisible2 ? 'Ukryj' : 'Modyfikuj' }}
      </button>
      <button style="margin:5px" @click="$emit('delete', id)">Usuń</button>

      <ul v-if="detailsAreVisible2" class="ulCustom">
        <form ref="formDataToClear" @submit.prevent="submitData">
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
            <button style="margin:5px" @click="$emit('modify', id), modifyNote(id)">
              Modyfikuj
            </button>
            <button @click="reloadPage()">Refresh</button>
          </div>
        </form>
      </ul>
    </div>
  </li>
</template>

<script>
import axios from 'axios';
export default {
  props: ['id', 'topic', 'category', 'description', 'onFileSelected', 'fileUploadName'],
  emits: ['delete', 'download', 'modify'],
  
  data() {
    return {
      detailsAreVisible: false,
      detailsAreVisible2: false,
      modifieClicked: false
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
    toggleDetails2() {
      this.detailsAreVisible2 = !this.detailsAreVisible2;
    },
    modifyNote(id) {
      const fd = new FormData();
      fd.append('ID', this.id);
      fd.append('Name', this.enteredTopic);
      fd.append('Description', this.enteredDescription);
      fd.append('Category', this.entredCatgory);

      axios.put('https://schoolnotesappservicewindows.azurewebsites.net/api/files/edit/' + id, fd).then(
        response => {
          console.log(response);
          alert('Notatka zmodyfikowana!');
          this.modifieClicked === true;
        },
        error => {
          console.log(error);
          alert('Ups... coś poszło nie tak :(');
          console.log(this.enteredTopic);
          console.log();
        }
      );
    },
    submitData(){
         this.$refs.formDataToClear.reset(); 
      },
    reloadPage() {
      
      window.location.reload();
      this.modifieClicked === false;
    }
  }
};
</script>

<style>
html {
  font-family: 'Jost', sans-serif;
}
.ulCustom {
  margin: 0;
  padding: 0;
  list-style: none;
  list-style-type: none;
}
.liCustom {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  padding: 1rem;
  text-align: center;
  width: 75%;
  max-width: 75%;
  list-style-type: none;
}
h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #003300;
  margin: 0 0 1rem 0;
}
.opis{
    padding: 1rem;
    text-align: left;
}
</style>
