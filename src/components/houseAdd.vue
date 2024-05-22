<template>
    <div id="houseAdd">
    <h2>Create new listing</h2>
    <form >
        <div class="form_line">
            <div>
            <h5>Street name*</h5>
            <input class="wide_input"  type="text" name="street_name" placeholder="Enter the setreet name" v-model="house.streetName" :class="!house.streetName ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>House Number*</h5>
            <input class="narrow_input" type="text" name="house_number" placeholder="Enter house number" v-model="house.houseNumber" :class="!house.houseNumber ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
            </div>
            <div>
            <h5>Addition (optional)</h5>
            <input class="narrow_input" type="text" name="house_addition" placeholder="e.g. A" v-model="house.numberAddition" >
            </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Postal code*</h5>
            <input class="wide_input" type="text" name="postal_code" placeholder="e.g. 1000 AA" v-model="house.zip" :class="!house.zip ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>City*</h5>
            <input class="wide_input" type="text" name="city" placeholder="e.g. Utrecht" v-model="house.city" :class="!house.city ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Upload picture (PNG or JPG)*</h5>
            <div class="custom__image-container">
            <label id="add-img-label" for="add-single-img"  :class="!house.image ? {errorBorderImg : errorInput.redBorder} : ''">+</label>
            <input type="file" id="add-single-img" accept="png/jpg" v-on:change="onFileSelected">
        </div>
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Price*</h5>
            <input class="wide_input" type="number" name="price" placeholder="e.g. €150.000" v-model="house.price" :class="!house.price ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Size*</h5>
            <input class="narrow_input" type="number" name="size" placeholder="e.g. 60m2" v-model="house.size" :class="!house.size ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
            </div>
            <div>
            <h5>Garage*</h5>
            <select class="narrow_input selectt" name="garage" id="" placeholder="Select" required v-model="house.hasGarage" :class="!house.hasGarage ? {errorBorder : errorInput.redBorder, errorSelect : errorInput.redHolder}  : ''">
                <option value="" disabled selected hidden>Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Bedrooms*</h5>
            <input class="narrow_input" type="number" name="bedrooms" placeholder="Enter amount" v-model="house.bedrooms" :class="!house.bedrooms ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
            </div>
            <div>
            <h5>Bathrooms*</h5>
            <input class="narrow_input" type="number" name="bathrooms" placeholder="Enter amount" v-model="house.bathrooms" :class="!house.bathrooms ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
            </div>
        </div>
        <div class="form_line"> 
            <div>
            <h5>Construction date*</h5>
            <input class="wide_input" type="year" name="construction_date" placeholder="e.g. 1990" v-model="house.constructionYear" :class="!house.constructionYear ? {errorBorder : errorInput.redBorder, dateError: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Description</h5>
            <textarea placeholder="Enter description" v-model="house.description" :class="!house.description ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''"></textarea>
        </div>
        </div>  
        <p class="requiredText" :class="{reqShow : errorInput.reqField}">Required field missing </p>
        <button type="button" v-on:click="addHouse()">POST</button> 
        
    </form>
</div>
</template>

<script>
// import useValidate from '@vuelidate/core'
// import { required } from '@vuelidate/validators'
import axios from 'axios';

export default{
    name:"houseAdd",
    
    data(){
        return{
            house:{
                price: "",
                bedrooms: "",
                bathrooms: "",
                size: "",
                streetName: "",
                houseNumber: "",
                numberAddition: "",
                zip: "",
                city: "",
                constructionYear: "",
                hasGarage: "",
                description: "",
                image: null
            },
            errorInput:{
                redBorder: false,
                // redHolder: false,
                reqField: false
            }

        }

    },

    methods:{
        onFileSelected(e){
            this.house.image = e.target.files[0]
        },

        async addHouse(){

            if(this.house.price && this.house.bedrooms && this.house.image && this.house.bathrooms && this.house.size && this.house.streetName && this.house.houseNumber && this.house.zip && this.house.city && this.house.constructionYear && this.house.hasGarage && this.house.description && parseInt(this.house.constructionYear) >= 1910){

                const headers = {
                    "X-Api-Key": "w4imlskboN7a1F5IOyG2ThMpqWDR6XKY"
                };

                await axios.post("https://api.intern.d-tt.nl/api/houses", {price:this.house.price, bedrooms:this.house.bedrooms,bathrooms:this.house.bathrooms,size:this.house.size,streetName:this.house.streetName,houseNumber:this.house.houseNumber,numberAddition:this.house.numberAddition, zip:this.house.zip,city:this.house.city,constructionYear:this.house.constructionYear,hasGarage:this.house.hasGarage,description:this.house.description}, {headers})
                .then(response => console.log(response))
                .catch(error => console.log(error))

                let results = await axios.get("https://api.intern.d-tt.nl/api/houses", {
                    headers});

                var lastItem = results.data.pop()

                var lastId = lastItem.id

                const fd = new FormData();
                fd.append('image', this.house.image, this.house.image.name);

                await axios.post("https://api.intern.d-tt.nl/api/houses/"+ String(lastId) +"/upload", fd, {headers})
                .then(response=> {
                    if(response.status == (204 || 201 || 202 || 203 || 200)){
                        this.$router.push({name:'houseList'})
                    }
                })
                .catch(error => console.log(error))

            }else{
                console.log("error")
                this.errorInput.redBorder = true
                // this.errorInput.redHolder = true  
                this.errorInput.reqField = true             
            }
        
        }
        
    }
};
</script>

<style>

    #houseAdd{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }

    #houseAdd h2{
        margin-bottom: 20px;
    }

    #houseAdd form{
        width: 400px;
    }

    #houseAdd .form_line{
        display: flex;  
        margin-bottom: 20px;
    }

    #houseAdd .form_line div{
        float: left;
        margin-right: 20px;
    }

    #houseAdd h5{
        margin-bottom: 8px;
    }

    #houseAdd input{      
        padding-left: 20px; 
    }

    #houseAdd .wide_input{
        width: 400px;
        height: 60px;
        border-radius: 10px;
        border: none;
    }

    #houseAdd .narrow_input{
        width: 190px;
        height: 60px;
        border-radius: 10px;
        border: none;
    }

    select:invalid{
        color: grey;
    }

    select{
        padding: 15px;
    }

    #houseAdd textarea{
        width: 400px;
        height: 150px;
        padding: 20px;
        border-radius: 10px;
        border: none;
    }

    .custom__image-container input{
        opacity: 0;
        height: 0;
    }

    .custom__image-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .custom__image-container label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 250%;
        cursor: pointer;
        width: 100px;
        height: 100px;
        border: dashed 2px black;
        object-fit: cover;
    }

    #houseAdd button{
        float: right;
        width: 230px;
        height: 50px;
        background-color: #DD9185;
        color: white;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .errorBorder{
        border: 1px solid red !important;
    }

    .errorBorderImg{
        border-color: red !important;
    }

    .placeHolder::placeholder{
        color: red !important;
    }

    .errorSelect:first-of-type{
        color: red !important;
    }

    .requiredText{
        color: red;
        margin-bottom: 10px;
        margin-top: -10px;
        font-size: 15px;
        font-style: italic;
        font-weight: 100;
        display: none;
    }

    .reqShow{
        display: block !important;
    }

    .dateError{
        color: red;
    }

</style>