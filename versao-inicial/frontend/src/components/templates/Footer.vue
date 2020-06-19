<template>
  <footer class="footer">
    <span>
      Copyright
      <Strong>ChillStudio</Strong>
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: function(){
    return{
      contador:0
    }
  }
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>