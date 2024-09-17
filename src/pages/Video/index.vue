<template>
  <div
    :class="[windowType == 'portrait' ? 'container' : 'main']"
    ref="scrollContainer"
  >
    <div>
      <img
        :src="bg"
        v-if="windowType == 'portrait'"
        class="portraitimg"
      />
      <img
        v-else
        :src="bgInfo"
        class="horizontalimg"
      />
    </div>
    <div v-if="visable">
      <div class="box" v-if="windowType == 'portrait'">
        <img
          :src="blessportraitImg[blessId]"
          class="img"
          v-if="blessId"
        />
        <div class="action">
          <img
            :src="share"
            class="action_item"
            v-if="blessId"
          />
        </div>
        <img
          :src="emptyportrait"
          class="img"
          v-if="!blessId"
        />
        <div class="action" v-if="show && !blessId">
          <img
            :src="choose"
            class="action_item"
            @click="onChoose()"
          />
        </div>
        <div class="msgList rotate" v-if="!show && !blessId">
          <h4>选择祝福语:</h4>
          <div
            class="msgListItem"
            v-for="item in blessList"
            :key="item.id"
            @click="onChooseMsg(item.id)"
          >
            <img
              :src="item.id == id ? check : uncheck"
              class="icon"
            />
            {{item.name}}
          </div>
          <div class="actions" @click="onSubmit()">
            <img
              :src="submit"
              class="actions_item"
            />
          </div>
        </div>
      </div>
      <div class="box" v-else>
        <img
          :src="blessImg[blessId]"
          class="img"
          v-if="blessId"
        />
        <div class="action">
          <img
            :src="share"
            class="action_item"
            v-if="blessId"
          />
        </div>
        <img
          :src="empty"
          class="img"
          v-if="!blessId"
        />
        <div class="action" v-if="show && !blessId">
          <img
            :src="choose"
            class="action_item"
            @click="onChoose()"
          />
        </div>
        <div class="msgList" v-if="!show && !blessId">
          <h4>选择祝福语:</h4>
          <div
            class="msgListItem"
            v-for="item in blessList"
            :key="item.id"
            @click="onChooseMsg(item.id)"
          >
            <img
              :src="item.id == id ? check : uncheck"
              class="icon"
            />
            {{item.name}}
          </div>
          <div class="actions">
            <img
              :src="submit"
              class="actions_item"
              @click="onSubmit()"
            />
          </div>
        </div>
      </div>
      <div class="box" v-if="blessId">
        <img
          :src="listImg"
          class="img"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, onUnmounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import img1 from '@/assets/images/img1.png';
  import img2 from '@/assets/images/img2.png';
  import img3 from '@/assets/images/img3.png';
  import img4 from '@/assets/images/img4.png';
  import img5 from '@/assets/images/img5.png';
  import img6 from '@/assets/images/img6.png';
  import img7 from '@/assets/images/img7.png';
  import empty from '@/assets/images/empty.png';
  import emptyportrait from '@/assets/images/emptyportrait.png';
  import postcard1 from '@/assets/images/postcard1.png';
  import postcard2 from '@/assets/images/postcard2.png';
  // import postcard3 from '@/assets/images/postcard3.png';
  import postcard4 from '@/assets/images/postcard4.png';
  import postcard5 from '@/assets/images/postcard5.png';
  import postcardportrait1 from '@/assets/images/postcardportrait1.png';
  import postcardportrait2 from '@/assets/images/postcardportrait2.png';
  // import postcardportrait3 from '@/assets/images/postcardportrait3.png';
  import postcardportrait4 from '@/assets/images/postcardportrait4.png';
  import postcardportrait5 from '@/assets/images/postcardportrait5.png';
  import submit from '@/assets/images/submit.png';
  import choose from '@/assets/images/choose.png';
  import share from '@/assets/images/share.png';
  import listImg from '@/assets/images/list.png';
  import check from '@/assets/images/check.png';
  import uncheck from '@/assets/images/uncheck.png';
  import bgInfo from '@/assets/images/bg.jpg';
  import bg from '@/assets/images/bgInfo.jpg';
  const router = useRouter();
  const show = ref(true);
  const visable = ref(false);
  const scrollContainer = ref(null);
  const blessList = ref([
    {
      id: 1,
      name: '我爱你，中国！'
    },
    {
      id: 2,
      name: '一生所幸，乃生华夏。'
    },
    {
      id: 3,
      name: '筑梦灯火万家，同庆盛世中华。'
    },
    {
      id: 4,
      name: '清澈的爱，只为中国。'
    },
    {
      id: 5,
      name: '举国上下齐欢畅，家和国盛万事兴！'
    }
  ]);
  const blessId = ref(null);
  const id = ref(null);
  const blessImg = ref({
    1: postcard1,
    2: postcard2,
    3: postcard1,
    4: postcard4,
    5: postcard5,
  });

  const blessportraitImg = ref({
    1: postcardportrait1,
    2: postcardportrait2,
    3: postcardportrait1,
    4: postcardportrait4,
    5: postcardportrait5,
  });
  const windowType = ref('');

  const height = ref(0);
  const width = ref(0);
  const imgHeight = ref(0);

  const list = ref([
    {
      url: img1
    },
    {
      url: img2
    },
    {
      url: img3
    },
    {
      url: img4
    },
    {
      url: img5
    },
    {
      url: img6
    },
    {
      url: img7
    }
  ])

  onUnmounted(() => {
    scrollContainer.value = window.removeEventListener('scroll', handleScroll);
  });

  onMounted(()=>{
    resize();
    scrollContainer.value.addEventListener('scroll', handleScroll);
    window.addEventListener("resize", ()=>{
      resize();
    });
  })

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = scrollContainer.value;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setTimeout(()=>{
        // router.push('/card')
        visable.value = true;
      }, 300)
    }
    if (scrollTop == 0) {
    }
  };

  const checkOrientation = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
    return width.value > height.value? 'landscape' : 'portrait';
  }

  const resize = () => {
    let type = checkOrientation();
    windowType.value = type;
  }

  const onChoose = () => {
    show.value = false;
  }

  const onSubmit = () => {
    show.value = true;
    blessId.value = id.value;
  }

  const onChooseMsg = (val) => {
    id.value = val;
  }
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
