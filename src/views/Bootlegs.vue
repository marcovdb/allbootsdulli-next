<template>
    <div class="bootlegs">        
        <table class="table table-striped table-sm mt-5">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Artist</th>
                    <th>Venue</th>
                    <th>Location</th>
                </tr>
            </thead>
            <paginate name="shows" tag="tbody" :list="shows" :per="20">
                <tr v-for="show in paginated('shows')" :key="show.id">
                    <td>{{ show.date }}</td>
                    <td>{{ show.artist }}</td>
                    <td>{{ show.venue }}</td>
                    <td>{{ show.location }}</td>
                </tr>
            </paginate>
        </table>
        <paginate-links for="shows" :classes="{ ul: ['pagination', 'justify-content-center'], li: 'page-item', a: 'page-link' }"></paginate-links>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            paginate: ['shows'],
            shows: []
        }
    },
    created: function () {
        this.get('shows').then((response) => this.shows = response.data)
    }
}
</script>