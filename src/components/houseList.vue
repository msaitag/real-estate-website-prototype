<template>
    <div id="houseList">
        <!-- <div class="searchAndSort">
            <div class="search">Search</div>                
            <div class="sort">
                <button v-on:click="sort('price')">price</button>
                <button>size</button>
            </div>
        </div> -->
    <ul v-for="item in homeAds" v-bind:key="item.id">
    <li><div class="img_container">
        <img :src="item.image" alt="" >
        </div>
        <div class="info_container">
            <h3>{{ item.location.street }}</h3>
            <h4>{{ item.price }}</h4>
            <h5>{{ item.location.zip }} {{ item.location.city }}</h5>
            <div class="icon_container">
                <div><img src="../assets/ic_bed@3x.png" alt=""> {{ item.rooms.bedrooms }}</div>
                <div><img src="../assets/ic_bath@3x.png" alt=""> {{ item.rooms.bathrooms }}</div>
                <div><img src="../assets/ic_size@3x.png" alt=""> {{ item.size }}</div>
            </div>
        </div>
        <div class="houseUpdDel">
            <router-link :to="'/houseUpd/'+item.id"><img src="../assets/ic_edit@3x.png" alt=""></router-link>
            <button v-on:click="delHouse(item.id)"><img src="../assets/ic_delete@3x.png" alt=""></button>
            
        </div>
    </li>
    </ul>
    </div>
</template>

<script>
import axios from 'axios';
// import {_} from 'vue-underscore';

export default{
    name:"houseList",
    data(){
        return {
            name:'',
            homeAds:[],
            sortBy: 'id',
            sortDirection: 'asc'
        }
    }
    // ,
    // created:{
    //     sortedHouses: function(){
    //         return this.homeAds.sort((p1,p2) => {
    //         let modifier = 1;
    //         if(this.sortDirection === 'desc') modifier = -1;
    //         if(p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier; 
    //         if(p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
    //         return 0;
    //     });
    // }
    // }
    ,
    async mounted(){
        this.loadData()
    },
    methods:{
        sort: function(s){
        if(s === this.sortBy) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        }
        this.sortBy = s;
        },
        async delHouse(id){
            let headers = {"X-Api-Key": "w4imlskboN7a1F5IOyG2ThMpqWDR6XKY"}

            await axios.delete("https://api.intern.d-tt.nl/api/houses/"+id, {headers})
            .then(response => {
                if(response.status == (204 || 201 || 202 || 203 || 200)){
                    this.loadData()
                }
            })
            .catch(error => console.log(error))
        },
        async loadData(){
            console.log("laskdla")
        let results = await axios.get("https://api.intern.d-tt.nl/api/houses/", {
            headers:{
                "X-Api-Key": "w4imlskboN7a1F5IOyG2ThMpqWDR6XKY"
            }
        });
        this.homeAds = results.data
        console.log(this.homeAds)
    }
    // , 
    // sortPrice: function(){
    //     this.sortBy = ['price'];
    //     console.log(this.sortBy);
    //     this.$forceUpdate();
    // }
}
}
</script>

<style>

body{
    background-color: #F6F6F6;
}

#houseList{
    width: 70%;
    margin-left: auto;
    margin-right: auto;
}

#houseList ul{
    list-style-type: none;
    margin-top: 10px;
}

#houseList ul li{
    height: min-content;
    align-items: center;
    display: inline-block;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 10px;
    position: relative;
}

.img_container{ 
    float: left;
    padding: 25px;
}

.img_container img{
    width: 150px;
    height: 150px;
    border-radius: 10px;
}

.info_container{
    height: 200px;
    vertical-align: middle;
    display: table-cell;
}

.info_container h3{
    padding-bottom: 10px;
}

.info_container h4{
    padding-bottom: 10px;
}

.info_container h5{
    padding-bottom: 7px;
}

.icon_container div{
    float: left;
    margin-right: 15px;
    align-items: center;
    display: flex;
}

.icon_container img{
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 10px;
}

.houseUpdDel{
    position: absolute;
    display: flex;
    right: 25px;
    top: 25px;
}

.houseUpdDel img{
    width: 18px;
}

.houseUpdDel button{
    margin-left: 18px;
    border-style: none;
    background-color: #fff;
    cursor: pointer;
}

.searchAndSort{
    height: 50px;
}

.searchAndSort .search{
    float: left;
}

.searchAndSort .sort{
    float: right;
}

.sort button{
    float: left;
    margin-left: .5px;
    width: 150px;
    height: 40px;
    cursor: pointer;
}

.sort button{
    background-color: #C3C3C3;
    color: #fff;
    border: none;
}

.sort button:first-child{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.sort button:last-child{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.sort button:focus{
    background-color: #E65540;
}


</style>