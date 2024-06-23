<script setup lang="ts">
</script>

<template>
  <div class="home">
    <section class="features">
      <h2>测试工具介绍</h2>
      <p>我们的测试工具提供以下题目的测试：</p>
      <ul>
        <li class="feature-item">三角形形状判断</li>
        <li class="feature-item">万年历</li>
        <li class="feature-item">电信收费系统</li>
        <li class="feature-item">电脑销售系统</li>
      </ul>
    </section>
    <section class="team">
      <h2>团队信息</h2>
      <p>组员：唐书涵, 王姝谕, 汤可娴, 夏尧民</p>
      <p>指导教师：杜庆峰</p>
    </section>
  </div>
</template>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 40px;
  background-color: #f0f2f5;
}

header {
  background-color: #1890ff;
  color: white;
  padding: 40px 0;
}

.features, .team {
  margin: 40px auto;
  padding: 20px;
  width: 60%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  margin: 0 0 20px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li.feature-item {
  background: #e6f7ff;
  margin: 15px 0;
  padding: 20px;
  border: 1px solid #91d5ff;
  border-radius: 4px;
}


.team p {
  margin: 10px 0;
  font-size: 18px;
}
</style>
