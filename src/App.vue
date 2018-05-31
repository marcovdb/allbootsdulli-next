<template>
    <div class="container" id="app">
        <header>
            <nav class="navbar navbar-expand-lg">
                <span class="navbar-brand mb-0 h1">
                    <div class="logo"></div>
                </span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <i class="fas fa-bars"></i>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="mainNavBar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">FAQ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link">Contact</router-link>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0 ml-auto">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <nav class="navbar navbar-expand-lg bg-primary">
                <router-link to="/" class="navbar-brand">
                    <i class="fas fa-home"></i>
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#secondaryNavBar" aria-controls="secondaryNavBar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <i class="fas fa-bars"></i>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="secondaryNavBar">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="artist in artists" :key="artist.id">
                            <router-link :to="'bootlegs/artist/' + artist.id" class="nav-link">{{ artist.name }}</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <router-view />
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            artists: []
        }
    },
    created: function() {
        this.get('artists').then((response) => this.artists = response.data)
    }
}
</script>

<style lang="less">
@import (reference) './assets/variables.less';

body {
    background-image: url('./assets/background.jpg');
    background-size: cover;
}

.logo {
    background-image: url('./assets/logo.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 100px;
    width: 300px;
}
</style>