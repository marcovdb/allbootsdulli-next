<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-4 col-md-3 pt-5 sidebar">
                <h3>Filter by artist</h3>
                <div class="form-check" v-for="artist in artists" :key="artist.id">
                    <input class="form-check-input" type="checkbox" v-model="artistFilter" :value="artist.id" :id="'artist' + artist.id">
                    <label class="form-check-label" :for="'artist' + artist.id">{{ artist.name }}</label>
                </div>
                <h3 class="mt-4">Filter by venue</h3>
                <div class="form-group">
                    <datalist id="venues">
                        <option v-for="venue in allVenues" :key="venue.id" :value="venue.name"></option>
                    </datalist>
                    <input class="form-control form-control-sm" type="text" list="venues" placeholder="Type a venue name..." @input="debounceInput">
                </div>
            </div>
            <div class="col-sm-8 col-md-9">
                <div class="card bg-transparent">
                    <div class="card-body">
                        <span class="badge badge-pill badge-primary" v-if="venueFilter" @click="venueFilter = ''">Venue: {{ venueFilter }} <i class="fas fa-times"></i></span>
                        <span class="badge badge-pill badge-primary" v-if="songFilter" @click="$router.push({ path: 'bootlegs', query: null });">Song: {{ songFilter }} <i class="fas fa-times"></i></span>
                    </div>
                </div>
                <table class="table table-striped table-sm mt-2">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Artist</th>
                            <th>Venue</th>
                            <th class="d-none d-sm-block">Location</th>
                        </tr>
                    </thead>
                    <paginate name="shows" tag="tbody" :list="shows" :per="30">
                        <tr v-for="show in paginated('shows')" :key="show.id">
                            <td>{{ show.date }}</td>
                            <td>{{ show.artist }}</td>
                            <td>{{ show.venue }}</td>
                            <td class="d-none d-sm-block">{{ show.location }}</td>
                        </tr>
                    </paginate>
                </table>
                <paginate-links for="shows" :classes="{ ul: ['pagination', 'justify-content-end'], li: 'page-item', a: 'page-link' }"></paginate-links>
            </div>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
    data: function () {
        return {
            allShows: [],
            allVenues: [],
            artists: [],
            artistFilter: [],
            paginate: ['shows'],
            songFilter: '',
            venueFilter: ''
        }
    },
    computed: {
        shows: function() {
            let shows = this.allShows.filter((value) => this.artistFilter.indexOf(value.artistid) > -1);

            if (this.venueFilter) {
                shows = shows.filter((value) => value.venue && value.venue.indexOf(this.venueFilter) > -1)
            }

            return shows;
        }
    },
    methods: {
        setArtistFilter () {
            if (this.$route.query.artist) {
                this.artistFilter.splice(0, this.artistFilter.length)
                this.artistFilter.push(parseInt(this.$route.query.artist, 10))
            } else {
                this.artistFilter = this.artists.map((value) => value.id)
            }
        },
        debounceInput: debounce(function(event) {
            this.venueFilter = event.target.value
        }, 500),
        getShows () {
            if (this.$route.query.songTitle) {
                let songTitle = decodeURIComponent(this.$route.query.songTitle);
                this.songFilter = songTitle;
                this.get(`shows/${songTitle}`).then((response) => this.allShows = response.data);
            } else {
                this.get('shows').then((response) => this.allShows = response.data)
                this.songFilter = '';
            }
        }
    },
    created: function () {
        this.get('artists').then((response) => {
            this.artists = response.data
            this.setArtistFilter()
        })
        
        this.get('venues').then((response) => this.allVenues = response.data)

        this.getShows()
    },
    watch: {
        $route: function(newVal) {
            this.getShows()
            this.setArtistFilter()
        }
    }
}
</script>

<style scoped lang="less">
.sidebar {
    h3 {
        &:after {
            content: '';
            border-bottom: 4px solid rgb(170, 170, 170);
            width: 5rem;
            display: block;
            margin: 0.5rem 0;
        }
    }
}
</style>