<template>
    <div class="home">
        <div class="row">
            <div class="col-lg-9">
                <h3 class="my-4">Latest news</h3>
                <div class="card bg-secondary my-3 text-dark" v-if="news && news.length">
                    <div class="card-body">
                        <h5 class="card-title">{{ news[0].title }} <span class="badge" v-moment:fromNow="news[0].date_added"></span></h5>
                        <div class="card-text text-dark" v-html="news[0].content_parsed"></div>
                    </div>
                </div>
                <h3 class="my-4">News of yore</h3>
                <div class="card-columns text-light">
                    <div class="card bg-primary" v-for="item in news.slice(0, 5)" :key="item.id">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <div class="card-text" v-html="trim(item.content, 300)"></div>
                            <a href="#" class="btn btn-sm btn-secondary mt-3">View full item</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <h3 class="my-4">Latest additions</h3>
                <ul class="list-group">
                    <li class="list-group-item bg-secondary text-dark" v-for="item in latest" :key="item.id">
                        <h6 class="d-flex w-100 justify-content-between">{{ item.artist }} <span class="badge" v-moment:fromNow="item.date_added"></span></h6>
                        <p class="m-1"><small>{{ item.date }} @ {{ item.venue }}</small></p>
                        <p class="m-1"><small>{{ item.location }}</small></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data: function () {
        return {
            latest: [],
            news: []
        }
    },
    methods: {
        trim: (str, len) => {
            return str.substr(0, len) + '...'
        }
    },
    created: function () {
        this.get('news').then((response) => this.news = response.data);
        this.get('latest/5').then((response) => this.latest = response.data);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
    &:after {
        content: '';
        border-bottom: 4px solid rgb(170, 170, 170);
        width: 5rem;
        display: block;
        margin: 0.5rem 0;
    }
}
</style>