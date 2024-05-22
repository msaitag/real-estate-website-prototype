<template>
  <div id="houseNav">
        <ul>
    <li><img src="./assets/img_logo_dtt@3x.png" alt=""></li>
    <li><router-link to="/houseList"><h3>Houses</h3></router-link></li>
    <li><router-link to="/houseAdd"><h3>List Your House</h3></router-link></li>
    </ul>
    
  </div>
  <router-view></router-view>

</template>

<script>
// import houseNav from './components/houseNav.vue'

export default {
  name: 'App',
  // components:{
  //   houseNav
  // }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,500&display=swap');
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;

}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#houseNav{
        background-color: #fff;
        height: 100px;
        width: 100%;
        margin-top: 0px;
        margin-bottom: 20px;
    }

    #houseNav ul{
        align-items: center;
        display: flex;
        padding-top: 30px;
        margin-left: auto;
        margin-right: auto;
        list-style-type: none;
        width: 70%;
    }

    #houseNav h3{
        margin-left: 80px;
    }

    #houseNav a{
        color: #E2E2E2;
    }

    #houseNav a:link{
        text-decoration: none;
    }

    #houseNav img{
        height: 40px;
    }

  #houseNav a.router-link-active{
    color: #000;
  }

</style>
