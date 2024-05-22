<template>
    <div id="houseAdd">
    <h2>Create new listing</h2>
    <form >
        <div class="form_line">
            <div>
            <h5>Street name*</h5>
            <input class="wide_input"  type="text" name="street_name" placeholder="Enter the setreet name" v-model="house.location.street" :class="!house.location.street ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>House Number*</h5>
            <input class="narrow_input" type="text" name="house_number" placeholder="Enter house number" v-model="house.location.houseNumber" :class="!house.location.houseNumber ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
            </div>
            <div>
            <h5>Addition (optional)</h5>
            <input class="narrow_input" type="text" name="house_addition" placeholder="e.g. A" v-model="house.location.houseNumberAddition" >
            </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Postal code*</h5>
            <input class="wide_input" type="text" name="postal_code" placeholder="e.g. 1000 AA" v-model="house.location.zip" :class="!house.location.zip ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>City*</h5>
            <input class="wide_input" type="text" name="city" placeholder="e.g. Utrecht" v-model="house.location.city" :class="!house.location.city ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
        </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Upload picture (PNG or JPG)*</h5>
            <div class="custom__image-container">
            <label id="add-img-label" for="add-single-img" :class="!house.image ? {errorBorderImg : errorInput.redBorder} : ''">+</label>
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
            <select class="narrow_input selectt" name="garage" id="" placeholder="Select" required v-model="house.hasGarage" >
                <option value="" disabled selected hidden>Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            </div>
        </div>
        <div class="form_line">
            <div>
            <h5>Bedrooms*</h5>
            <input class="narrow_input" type="number" name="bedrooms" placeholder="Enter amount" v-model="house.rooms.bedrooms" :class="!house.rooms.bedrooms ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
            </div>
            <div>
            <h5>Bathrooms*</h5>
            <input class="narrow_input" type="number" name="bathrooms" placeholder="Enter amount" v-model="house.rooms.bathrooms" :class="!house.rooms.bathrooms ? {errorBorder : errorInput.redBorder, placeHolder: errorInput.redHolder}  : ''">
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
        <button type="button" v-on:click="updHouse()">POST</button>
        
    </form>
</div>

</template>
<script>
import axios from 'axios';


export default{
    name:'houseUpd',

    data(){
        return{
            house:{
                price: "",
                rooms:{
                bedrooms: "",
                bathrooms: ""
                },
                size: "",
                location:{
                    street: "",
                    zip: "",
                    houseNumber: "",
                    houseNumberAddition: "",
                    city: ""
                }, 
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

    async mounted(){
        const headers = {"X-Api-Key": "w4imlskboN7a1F5IOyG2ThMpqWDR6XKY"}

        const results = await axios.get("https://api.intern.d-tt.nl/api/houses/"+this.$route.params.id, {headers})

        console.log(results.data[0])

        this.house = results.data[0]

    },

    methods:{
        onFileSelected(e){
            this.house.image = e.target.files[0]

        },
        async updHouse(){

            const headers = {"X-Api-Key": "w4imlskboN7a1F5IOyG2ThMpqWDR6XKY"}


            if(this.house.price && this.house.rooms.bedrooms && this.house.image && this.house.rooms.bathrooms && this.house.size && this.house.location.street && this.house.location.houseNumber && this.house.location.zip && this.house.location.city && this.house.constructionYear && this.house.description && parseInt(this.house.constructionYear) >= 1910){

                if(this.house.image.name){
                const fd = new FormData();
                fd.append('image', this.house.image, this.house.image.name);
                await axios.post("https://api.intern.d-tt.nl/api/houses/"+ this.$route.params.id +"/upload", fd, {headers})
                .then(response=>console.log(response))
                .catch(error => console.log(error))
                }

                await axios.post("https://api.intern.d-tt.nl/api/houses/"+ this.$route.params.id , {price:this.house.price, bedrooms:this.house.rooms.bedrooms, bathrooms:this.house.rooms.bathrooms, size:this.house.size, streetName:this.house.location.street, houseNumber:this.house.location.houseNumber, numberAddition:this.house.location.houseNumberAddition, zip:this.house.location.zip, city:this.house.location.city,constructionYear:this.house.constructionYear, hasGarage:this.house.hasGarage, description:this.house.description}, {headers})
                .then(response => {
                    console.log(response)
                if(response.status == (204 || 201 || 202 || 203 || 200)){
                    this.$router.push({name:'houseList'})
                }}
                )
                .catch(error => console.log(error))         
            }

            else{
                console.log("error")
                this.errorInput.redBorder = true
                this.errorInput.redHolder = true  
                this.errorInput.reqField = true             
            }
        }
         
    }
}


</script>