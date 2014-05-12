require(["js/jQuery.js","js/jQuery_migrate.js","lib/js/head.min.js", "js/reveal.min.js"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
	
	 
	
	
	
	$( document ).ajaxStop(function() {
	
	 // Full list of configuration options available here:
        // https://github.com/hakimel/reveal.js#configuration
        Reveal.initialize({
            controls: true,
            progress: true,
            history: true,
            center: true,

            theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
            transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

            // Parallax scrolling
            // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
            // parallaxBackgroundSize: '2100px 900px',

            // Optional libraries used to extend on reveal.js
            dependencies: [
                { src: 'lib/js/classList.js', condition: function () { return !document.body.classList; } },
                { src: 'plugin/markdown/marked.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
                { src: 'plugin/markdown/markdown.js', condition: function () { return !!document.querySelector('[data-markdown]'); } },
                { src: 'plugin/highlight/highlight.js', async: true, callback: function () { hljs.initHighlightingOnLoad(); } },
                { src: 'plugin/zoom-js/zoom.js', async: true, condition: function () { return !!document.body.classList; } },
                { src: 'plugin/notes/notes.js', async: true, condition: function () { return !!document.body.classList; } }
            ]
        });
	});
	
	
	//load all slides
	$( "#slide0" ).load( "slides/slide0.html" );
	$( "#slide1" ).load( "slides/slide1.html" );
	$( "#slide2" ).load( "slides/slide2.html" );
	$( "#slide3" ).load( "slides/slide3.html" );
	$( "#slide4" ).load( "slides/slide4.html" );
	$( "#slide5" ).load( "slides/slide5.html" );
	$( "#slide6" ).load( "slides/slide6.html" );
	$( "#slide7" ).load( "slides/slide7.html" );
	$( "#slide8" ).load( "slides/slide8.html" );
	$( "#slide9" ).load( "slides/slide9.html" );
	$( "#slide10" ).load( "slides/slide10.html" );
	$( "#slide11" ).load( "slides/slide11.html" );
	$( "#slide12" ).load( "slides/slide12.html" );
	
	$( "#slide13" ).load( "slides/slide13.html" );
	
});