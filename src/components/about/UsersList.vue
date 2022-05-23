<template>

<br>
  <div>
    
  <li class="liCustom3">
    <strong> Witryna została przygotowany w ramach projektu zaliczeniowego. 
      Została ona wykonana przez Studentki z Grupy N22-31. Semestr letni 2021. </strong>
  </li>
</div>
<br>
<div style="position:absolute; width:100%; height:100%">
    <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img class="CustomImage" :src="currentImg" />
      </div>
    </transition-group>
    <!-- <a class="prev" @click="prev" >Previous</a>
    <a class="next" @click="next"> Next</a> -->
  </div>
</template>

<script>
const imgLink = require('@/assets/images/Darka.png')
const imgLink2 = require('@/assets/images/Paula.png')
const imgLink3 = require('@/assets/images/Natka.png')

 export default {
  name: "Slider",
  data() {
    return {
      images: [
        imgLink,
        imgLink2,
        imgLink3
        ],
      timer: null,
      currentIndex: 0
    };
  },

  mounted: function() {
    this.startSlide();
  },

  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 4000);
    },

    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    }
  },

  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    }
  }
};

</script>

<style>

.CustomImage
{
  
  margin-left: auto;
  margin-right: auto;
  display: block;
  

}
.liCustom3 {
  padding: 1rem;
  text-align: center;
  width: 100%;
  max-width: 100%;
  list-style-type: none;

}

</style>