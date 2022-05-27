<template>
  <div>
    <li class="liCustom1">
      <strong> Kategoria: </strong>
      <input
        type="radio"
        id="matematyka"
        value="matematyka"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="matematyka" class="radio-label">Matematyka</label>
      <input
        type="radio"
        id="Historia"
        value="historia"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="Historia" class="radio-label">Historia</label>
      <input
        type="radio"
        id="Polski"
        value="polski"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="Polski" class="radio-label">Polski</label>
      <input
        type="radio"
        id="Angielski"
        value="angielski"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="Angielski" class="radio-label">Angielski</label>
      <input
        type="radio"
        id="Fizyka"
        value="fizyka"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="Fizyka" class="radio-label">Fizyka</label>
      <input
        type="radio"
        id="Chemia"
        value="chemia"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="Chemia" class="radio-label">Chemia</label>
      <input
        type="radio"
        id="Informatyka"
        value="informatyka"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="Informatyka" class="radio-label">Informatyka</label>
      <input
        type="radio"
        id="Inne"
        value="inne"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="inne" class="radio-label">Inne</label>
      <input
        type="radio"
        id="Wyłacz"
        value="wyłacz"
        v-model="selectedRadio"
        class="radio-input"
      />
      <label for="Wyłacz" class="radio-label">Wyłacz filtr</label>
    </li>
  </div>

  <li class="liCustom2">
    <strong> Wyszukaj: </strong>
    <input
      class="customInput"
      type="text"
      v-model="search"
      placeholder="Wpisz szukaną frazę.."
    />
  </li>

  <display-notes
    v-for="item in filteredItems"
    :key="item.id"
    :id="item.id"
    :topic="item.name"
    :category="item.category"
    :description="item.description"
    :fileUploadName="item.fileUploadName"
    @delete="deleteNote"
    @download="downloadFile"
  
   
  ></display-notes>
</template>

<script>
import DisplayNotes from './DisplayNotes.vue';
import axios from 'axios';


export default {
  components: {
    DisplayNotes
  },
  data() {
    return {
      notatki: [],
      search: '',
      selectedRadio: 'wyłacz',
    };
  },
  watch: {
    selectedRadio(value) {
      this.selectedRadio = value;
      console.log(this.selectedRadio);
    },
    
       topic: function(newVal, oldVal) { 
          console.log('Prop changed: ', newVal, ' | was: ', oldVal)
        }
    
  },
  computed: {
   filteredItems() {
     
      if (this.selectedRadio === 'wyłacz') {
        return this.notatki.filter(item => {
          if (item.name !== null && item.description !== null) {
            let byName =
              item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            let byDescription =
              item.description
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1;
                
            if (byName === true) {
              return byName;
            } else if (byDescription === true) {
              return byDescription;
            }
          }
        });
      } else
        return this.notatki.filter(item => {
          if (item.name !== null && item.description !== null) {
            let byName =
              item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            let byDescription =
              item.description
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1;
              
            if (item.category !== null) {
              let byCategory =
                item.category
                  .toLowerCase()
                  .indexOf(this.selectedRadio.toLowerCase()) > -1;
              if (byName === true || (byName === true && byCategory === true)) {
                return byName, byCategory;
              } else if (
                byDescription === true ||
                (byDescription === true && byCategory === true)
              ) {
                return byDescription, byCategory;
                
              }
            }
          }
        });
    
    
    }
  },
  created() {
    this.pobierzZBazy();
  },
  methods: {
    pobierzZBazy() {
      fetch('https://schoolnotesappservicewindows.azurewebsites.net/api/files')
        .then(response => response.json())
        .then(data => (this.notatki = data));
    },
    deleteNote(noteId) {
      axios
        .delete('https://schoolnotesappservicewindows.azurewebsites.net/api/files/delete/' + noteId)
        .then(response => {
          this.notatki = this.notatki.filter(item => item.id !== noteId);
          console.log(response);
        });
    },
    downloadFile(fileID, fileUploadName) {
     axios({
        url: 'https://schoolnotesappservicewindows.azurewebsites.net/api/files/downloadFile/' + fileID,
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', fileUploadName );
        document.body.appendChild(fileLink);

        fileLink.click();
        console.log(fileUploadName)
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        console.log('bloob: ' + fileLink.type);
      });
    },
    // modyfikacja(noteId){
    //   this.notatki = this.notatki.filter(item => item.id === noteId);
    // }

  }
};
</script>
<style>
.liCustom1 {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  padding: 1rem;
  text-align: left;
  width: 75%;
  max-width: 75%;
  list-style-type: none;
  font-weight: lighter;
}
.liCustom2 {
  border: 1px;
  margin:  auto;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: left;
  width: 70%;
  max-width: 70%;
  list-style-type: none;
}
.customInput {
  border-width: 0px;
  border: none;
  box-shadow: none;
  outline: none;
  width: 80%;
}
.radio-label {
  display: inline-block;
  vertical-align: top;
  margin-right: 0.5rem;
  width: auto;
  font-weight: lighter;
}
.radio-input {
  display: inline-block;
  vertical-align: top;
}
</style>
