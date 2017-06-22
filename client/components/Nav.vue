<template>
    <header class="nav-bar">
        <span class="main-header-info">门店管理系统</span>
        <span class="main-header-info">某某人</span>
        <span class="main-header-info time-clock"></span>
        <a href="/logout" class="logout">退出登录></a>
    </header>
</template>

<style lang="scss" scoped>
.nav-bar{
    text-align: center;
    height: 30px;
    background-color: #601e39;
    .main-header-info{
        color: #e0dcde;
        line-height: 30px;
        margin-right: 20px;
        text-shadow: 0 1px 1px #000;
        font-size: 13px;
    }
}
</style>
