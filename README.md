# vue-paginate-scroll
Vue component that handles "infinite scroll"


`npm install vue-paginate-scroll`

➡➡[Example here](https://codesandbox.io/s/vuepaginatescroll-example-hqsqt?file=/src/App.vue)

### Install as global component
```javascript
  //index.js
 
  import Vue from "vue";
  import VuePaginateScroll from "vue-paginate-scroll";
  
  Vue.component('vue-paginate-scroll', VuePaginateScroll);
  
  new Vue({
   //...
  });
```

### Install as local component
```vue
  <script>
  import VuePaginateScroll from "vue-paginate-scroll";
  
  export default {
    ...
    components: { VuePaginateScroll }
    ...
  }
  </script>
```

## Props
  **src**: type: Array, required. Data to use as source.
  
  **perScroll**: type: Number, default: 10. Define how many items to show per scroll
  
  **observerOptions**: type: Object, default: {threshold: .75}. IntersectionObserver options
  
## Slots
  **default**: use this to get the data to display. Data exposed `{ data, currentScroll, lastScroll }`
 
