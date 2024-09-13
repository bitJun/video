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
    </div>
  </div>
</template>
<script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted, reactive, nextTick } from 'vue';
  import coverImg from '@/assets/images/cover.png';
  import titleImg from '@/assets/images/title.png';
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
    setTimeout(()=>{
      router.push('/video')
    }, 3000);
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
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 52px;
  left: 0;
}
@media screen and (orientation: portrait) {
  .main {
    transform-origin:top left;
    transform: rotate(90deg) translateY(-100%);
    width: 100vh !important;
    height: 100vw !important; 
    position: absolute;
    top: 0;
  }
  .box .coverImg {
    object-fit: cover;
    width: 100vh !important;
    height: 100vw !important; 
  }
} 
@media screen and (orientation: landscape) {
  /*横屏...*/
}
</style>