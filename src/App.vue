<template>
    <div class="container" id="app">
        <header>
            <nav class="navbar navbar-expand-lg py-2">
                <span class="navbar-brand mb-0 h1 pr-5">
                    <div class="logo"></div>
                </span>
                <button class="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <i class="fas fa-bars align-middle"></i>
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
                </div>
            </nav>
            <nav class="navbar navbar-expand-md bg-primary">
                <router-link to="/" class="navbar-brand">
                    <i class="fas fa-home"></i>
                </router-link>
                <button class="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#secondaryNavBar" aria-controls="secondaryNavBar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <i class="fas fa-bars align-middle"></i>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="secondaryNavBar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/bootlegs" class="nav-link">All bootlegs</router-link>
                        </li>
                        <li class="nav-item">
                            <div class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Bootlegs by artist
                                </a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <template v-for="artist in artists">
                                        <router-link :to="'bootlegs?artist=' + artist.id" class="dropdown-item" :key="artist.id">{{ artist.name }}</router-link>
                                    </template>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item">
                            <router-link to="/statistics" class="nav-link">Statistics</router-link>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0 ml-auto">
                        <input class="form-control form-control-sm" type="search" placeholder="Search..." list="songs" aria-label="Search" @input="goToBootlegs">
                        <datalist id="songs">
                            <option v-for="song in songs" :key="song.id" :value="song.title"></option>
                        </datalist>
                    </form>
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
            artists: [],
            songs: []
        }
    },
    methods: {
        goToBootlegs(event) {
            this.$router.push({ path: 'bootlegs', query: { songTitle: encodeURIComponent(event.target.value) }});
        }
    },
    created: function() {
        this.get('artists').then((response) => this.artists = response.data)
        this.get('songs').then((response) => this.songs = response.data)
    }
}
</script>

<style lang="less">
@import (reference) './assets/variables.less';

body {
    background-attachment: fixed;
    background-image: url('./assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: scroll;
}

header {
    .logo {
        background-image: url('./assets/logo.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        height: 100px;
        width: 300px;
    }
}
</style>