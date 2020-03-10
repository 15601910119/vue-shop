<template>
  <side-drawer>
    <i
      class="el-icon-star-off"
      slot="icon"
    ></i>
    <div class="nav-shop">
      <ul>
        <li>
          <h5>Home</h5>
        </li>
        <li>
          <h5>Blog</h5>
          <h5>+</h5>
        </li>
        <li>
          <h5>Shop</h5>
          <h5>+</h5>
        </li>
        <li>
          <h5>Pages</h5>
          <h5>+</h5>
        </li>
        <li>
          <h5>Contact</h5>
        </li>
      </ul>
    </div>
  </side-drawer>
</template>

<script>
import Commodity from './commodity';
import Drawer from './drawer';

export default {
  components: {
    commodity: Commodity,
    'side-drawer': Drawer
  }
};
</script>
<style lang="less">
.nav-shop {
  padding: 100px;
  ul {
    font-size: 25px;
    li {
      padding: 30px 0;
      list-style: none;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
