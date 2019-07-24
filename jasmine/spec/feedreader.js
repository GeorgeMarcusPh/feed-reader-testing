/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds array is defined and not empty', ()=> {
            // Tests whether allFeeds array is defined as a variable or not
            expect(allFeeds).toBeDefined();

            // Checks whether the allFeeds array is empty or not
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('Url is defined and not empty', ()=>{
            // Loop through allFeeds array and check that each feed's url is defined and not empty
            for (let feed of allFeeds){

                // Tests whether the feed's url is defined as a variable or not
                 expect(feed.url).toBeDefined();

                // Checks whether the feed's url is empyty or not
                 expect(feed.url.length).not.toBe(0);
            }
           
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         /* We're gonna do the same as what we have done with the url attribute
         *  to the name attribute of each feed*/

         it('Name is defined and not empty', ()=> {

            // Loop through allFeeds array and check that each feed's url is defined and not empty
            for (let feed of allFeeds){

                 // Tests whether the feed's name is defined as a variable or not
                 expect(feed.name).toBeDefined();

                 // Checks whether the feed's name is empyty or not
                 expect(feed.name.length).not.toBe(0);
            }
           
         });
    });


    /* Write a new test suite named "The menu" */
      describe('The Menu', function() {

        //The body element that holds the menu slider 
        const body = document.querySelector('body');

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('Menu element is hidden by default', ()=> {

            /*Checks that the body element has its class attribute set to menu-hidden
             *so that the menu slider is hidden by default */

            expect(body.classList).toContain("menu-hidden");
        });

          /* Write a test that ensures the menu changes
          *  visibility when the menu icon is clicked. This test
          *  should have two expectations: does the menu display when
          *  clicked and does it hide when clicked again.
          */
    
         it('Menu appears when clicked once and hides when clicked again', ()=> {

            // In The app.js file we use the JQuery toggleClass method to show and hide the menu
            // Here were using JS method toggle to fake a mouse click
            body.classList.toggle("menu-hidden");

            // When clicked (toggled), the menu should appear
            expect(body.classList.contains("menu-hidden")).toBe(false);  


             body.classList.toggle("menu-hidden");

            // When clicked again(toggled) the menu hides
            expect(body.classList.contains("menu-hidden")).toBe(true);      
         });

    });


      
      

    /* Write a new test suite named "Initial Entries" */
      describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
            // load one element and signal done when loadFeed finishes
            beforeEach(done => loadFeed(0, done));

            /* Checks whether there is at least one entry of feeds or not and pass the done function to
            * signal to the framework that this test relies on the beforeEach function*/

            it('At least a single entry exists', done =>{
                //  get the entry element
                const feedEntry = document.querySelectorAll('.feed .entry');

                //Checks whether it's empty or not 
                expect(feedEntry.length).toBeGreaterThan(0);

                // signal that this test relies on the asynchronous loadFeed function
                done();    
            });
    });

        /* Write a new test suite named "New Feed Selection" */

        describe('New Feed Selection', function() {

            // a variable to hold the feed innerText
            let firstFeed;

            /* As the loadFeed function is asynchronous, we should use the beforeEach global function and pass
             * the "done" parameter to its arrow function*/
            beforeEach(done => {

                //This load the first feed and gives it id 0 then pass a function to load the next feed and get the first feed's text
                loadFeed(0, ()=> {
                    // assign the innerText of the first feed element to the "firstFeed" variable
                    firstFeed = document.querySelector('.feed').innerText;

                    // load the second feed and give it id 1 and mark the  it as done
                    loadFeed(1, done);
                });
                
            });

             /* Write a test that ensures when a new feed is loaded
            * by the loadFeed function that the content actually changes.
            * Remember, loadFeed() is asynchronous.
            */

            /* Checks whether the content of the first feed is different from the second*/
            it('Content Changed After first loading', done => {

                // Get the feed's innerText
                const secondFeed = document.querySelector('.feed').innerText;

                // Check whether the firstfeed's text and the secondfeed's text are equal or not
                expect(firstFeed).not.toEqual(secondFeed);

                // signal that this test relies on the asynchronous loadFeed function
                done();  
            });
        

     });
         
}());
