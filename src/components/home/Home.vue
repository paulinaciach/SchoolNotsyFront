<template>
  <div class="box">

      <img :src="background">
      
  </div>
</template>

<script>
const imgLink = "https://storageschoolnotes.blob.core.windows.net/assets/school3.jpg"
export default {
  data(){
    return{
      background: imgLink
    }
  }
}
</script>

<style>
.box {
  /* display: flex; */
  align-items: center;
  justify-content: center;
}

.box img {
  /* width: 100%;
  height: 30%; */
  background-size: cover
}
</style>