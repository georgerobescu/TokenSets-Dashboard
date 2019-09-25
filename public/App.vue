<template>
	<div id="app">
		<router-view/>
		<footer></footer>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

/*==================================================
  Basics
  ==================================================*/

body {
	font-family: 'Roboto', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
	font-size: 18px;
	margin: 0;
	/*background-image: linear-gradient(360deg, rgb(57, 71, 251) 0%, rgb(44, 142, 255) 100%);
	color: white;*/
}

footer {
	height: 2em;
}
</style>
