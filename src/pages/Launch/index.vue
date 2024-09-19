<template>
  <div class="main" :class="windowType">
    <div class="box">
      <img
        :src="coverImg"
        class="coverImg"
      />
      <img
        :src="titleImg"
        class="title"
      />
      <img
        :src="enterImg"
        class="enter "
        @click="onEnter()"
      />
    </div>
  </div>
</template>
<script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted, reactive, nextTick } from 'vue';
  import coverImg from '@/assets/images/cover.png';
  import titleImg from '@/assets/images/title.png';
  import enterImg from '@/assets/images/enter.png';
  const direction = ref('Vertical');
  const height = ref(0);
  const width = ref(0);
  const windowType = ref('');
  const router = useRouter();

  onMounted(()=>{
    resize()
    window.addEventListener("resize", ()=>{
      resize();
    });
    // setTimeout(()=>{
    //   router.push('/video')
    // }, 3000);
  })

  const checkOrientation = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    return width.value > height.value? 'landscape' : 'portrait';
  }

  const resize = () => {
    let type = checkOrientation();
    windowType.value = type;
    if (type == 'portrait') {

    }
  }

  const onEnter = () => {
    router.push('/video')
  }
</script>
<style lang="less" scoped>
.box {
  position: relative;
}
.box .coverImg {
  object-fit: cover;
  width: 100vw;
  height: 100vh;
}
.title {
  width: 333px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 113px;
}
.enter {
  position: absolute;
  left: 34px;
  bottom: 40px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 136px;
  height: auto;
}
// @media screen and (orientation: portrait) {
//   .main {
//     transform-origin:top left;
//     transform: rotate(90deg) translateY(-100%);
//     width: 100vh !important;
//     height: 100vw !important; 
//     position: absolute;
//     top: 0;
//   }
//   .title {
//     bottom: 100px;
//   }
//   .box .coverImg {
//     object-fit: cover;
//     width: 100vh !important;
//     height: 100vw !important; 
//   }
// } 
.rotate {
  transform: rotate(-90deg);
}
@media screen and (orientation: landscape) {
  /*横屏...*/
}
</style>