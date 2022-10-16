<template>
	<main class="home-page">
		<Title />
		<div class="view_text">
			<p>Welcome to APIbuster's user dashboard.<br>
				With this app you can test your API in real-time.</p><br>

			<p>Take into consideration that all tests must be written using <a href="https://mochajs.org">MochaJS</a> and <a href="https://www.chaijs.com/">Chai</a>.</p><br><br>


			<h3>Typical test creation</h3><br>
			
			<p>This is an example of a typical test file:</p>
				
			<pre>
				<code>
			const testlab = require('@loopback/testlab');
			const axios = require('axios');

			describe('GET a JSON result test example', async () => {
				it('GET success - Expecting result to have property "exampleProp"', async () => {
					const res = await axios.get("https://www.exampleAPI.com");
					testlab.expect(res).to.have.property("exampleProp");
				});
			});
				</code>
			</pre>
			
			<p>In this test you create a test suite, 'GET a JSON result test example', which has a single test, 'GET success - Expecting result to have property "exampleProp"'.<br>
				A GET request is made to "https://www.exampleAPI.com" and the result is kept on variable "res".<br>
				The test expects the return value of the request to have a property named "exampleProp".</p><br>

			<h4>NOTE: </h4><p>This is a fictional example.</p>
			<p>Please visit MochaJS <a href="https://github.com/mochajs/mocha-examples">GitHub</a> for examples.</p><br><br>


			<h3>APIbuster test creation</h3><br>

			<p>With APIbuster you don't need to create the whole test suite. You just need to focus on creating the tests.<br>
				There are a set of steps that need to be followed when creating tests for an API.<br><br>

							1st - Create a API instance.<br>
							2nd - Create the methods for the created API.<br>
							3rd - Create test groups for each created method to be tested.<br>
							4th - Create tests for each created test group.<br><br>
				
				When creating a new test instance the user only needs to worry about creating the expect part of the example provided above.</p><br>

			<pre>
				<code>
					expect(res).to.have.property("exampleProp");
				</code>
			</pre>

			<p>With the created API, method and test group instances, APIbuster automatically creates the base structure for the test files.<br>
				With each test instance it then finishes writing tests.</p><br>

			<p>Variable "res" will <b>always</b> be the saved result variable of the request you're expecting based on the method you're testing.</p><br><br>

			<h4>NOTE: </h4><p>Users can still make new requests using <a href="https://axios-http.com/docs/example">axios</a> and manage that data, like below: </p>
			
			<pre>
				<code>
					const newRes = await axios.get("https://www.exampleAPI.com");

					expect(newRes).to.have.property("exampleProp");
				</code>
			</pre>

			<p>This is specially useful for PATCH / DELETE request tests. PATCH and DELETE requests are normally <i>'void'</i>, which means there's no return value for this requests.<br>
				So if the changes to the API need to be tested, new requests are normally made.</p><br><br>


			<p>With this brief explanation, proceed to API page using the sidebar and create your own tests.<br>
				This is a prototype still in development.</p><br>

		</div>
	</main>
</template>

<script setup>
import Title from '../components/Title.vue'
</script>

<style>
.view_text {
	margin-top: 10rem;
	font-size: 1.5rem;
}

pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
	width: 1200px;
  padding: 5px;
}
</style>