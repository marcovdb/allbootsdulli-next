<template>
    <div class="hello">
        <h1 class="mt-5">Latest news</h1>
        <div class="card bg-primary my-3" v-if="news && news.length">
            <div class="card-body">
                <h3 class="card-title">{{ news[0].title }}</h3>
                <div class="card-text" v-html="news[0].content_parsed"></div>
            </div>
        </div>
        <h2 class="mt-5">Older news items</h2>
        <div class="card-columns">
            <div class="card bg-secondary" v-for="item in news.slice(0, 10)" :key="item.id">
                <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <div class="card-text text-dark" v-html="trim(item.content_parsed, 250)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data: () => {
        return {
            news: []
        }
    },
    methods: {
        trim: (str, len) => {
            return str.substr(0, len) + '...'
        }
    },
    created: function() {
        this.get('news').then((response) => this.news = response.data)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>