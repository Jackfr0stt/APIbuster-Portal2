<template>
	<main class="home-page">
		<Title />
		<div class="view_text">
			<p>Welcome to APIbuster user dashboard.</p>
			<p>With this app you can test your API in real-time.</p><br>

			<p>Take into consideration that all tests must be written using mocha and chai.</p><br>
			
			<p>Please visit <a href="https://mochajs.org/">MochaJS</a> website for examples.</p><br><br>
			
			<p>You only need to worry about creating the test itself. For example:</p>
				
			<pre>
				<code>
					it('respond with matching records', function (done) {
						db.find({type: 'User'}, function (err, res) {
							if (err) return done(err);
							res.should.have.length(3);
							done();
						});
					});
				</code>
			</pre>
			
			<p>In this test you're expecting the return value of the function to have at least a length equal to 3.</p><br><br>

			<p>Proceed to API page using the sidebar and create your own tests.</p><br>

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
	width: 1050px;
  padding: 5px;
}
</style>