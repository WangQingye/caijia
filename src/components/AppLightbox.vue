<template>
    <div id='overlay' @click='close'>
        <img :src='imgsource.imgUrl' alt='' />
        <span>{{ imgsource.caption }}</span>
    </div>
</template>

<script>

    export default{
        data(){
            return {

            }
        },
        props:{
            imgsource: Object,
            close: Function
        },

        mounted(){
            var overlay = document.getElementById('overlay');
            overlay.setAttribute('style', 'height:' + window.innerHeight + 'px; ' + 'width:' + window.innerWidth + 'px');
            console.log(window.innerWidth);
        }
    }

</script>

<style>


</style>
