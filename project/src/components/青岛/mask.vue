<template>
   <div class="g-maskbgs">
      <img src="../../assets/image/mask-bg.png" alt />
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.g-maskbgs {
  // pointer-events: none;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}

</style>