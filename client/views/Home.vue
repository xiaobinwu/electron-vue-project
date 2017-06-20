<template>
  <div class="page">
    <counter></counter>
    <p>
      To get started, edit files in <code>./client</code> and save.
    </p>
  </div>
</template>

<script>
import Counter from 'components/Counter'

export default {
  mounted(){
  	//  HTML5 Notification API
	let myNotification = new Notification('Title', {
	  body: 'Lorem Ipsum Dolor Sit Amet'
	})
	myNotification.onclick = () => {
	  console.log('Notification clicked')
	}
},
  components: {
    Counter
  }
}
</script>
