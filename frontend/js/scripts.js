//  This function is called when the state is changed and it populates the city column
function stateSelected(){
    var state = document.getElementById("state_id").value;
    
    var httpReq = createRequestObject();
    httpReq.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            
            var response = JSON.parse(this.responseText);
            
            var sel = document.getElementById('city_id');

            sel.options.length = 0;

            var count = Object.keys(response).length;

            for(var i = 0; i < count; i++){
                    var opt = document.createElement('option');
                    opt.innerHTML = response[i];
                    opt.value = response[i];
                    sel.appendChild(opt);
            }
        }
    }
    httpReq.open("GET", "../php/getCitiesByName.php?state="+state, true);
    httpReq.send(null);
}

//  This function will create an object for http request
function createRequestObject(){
    var ajaxSender;
    try {
      ajaxSender = new XMLHttpRequest();
    }catch (e) {
      try {
         ajaxSender = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
            ajaxSender = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            alert("Your browser broke!");
         }
      }
    }
    return ajaxSender;
}

//  This function is called when the search button is clicked
function searchRestaurants(){
    
    var state = document.getElementById("state_id").value;
    var city = document.getElementById("city_id").value;
    var cuisine_id = document.getElementById("cuisine_id").value;
    
    var httpReq = createRequestObject();
    
    httpReq.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert("Got message");
            var response = JSON.parse(this.responseText);
            
            var restaurants = response['restaurants'];
            
            //console.log(restaurants.length);
            
            //console.log(this.responseText);
            alert(JSON.stringify(restaurants));
            
            
            
            var appendChildToPage = document.getElementById("login-register-button-holder");
            var count = 0;
            
            for(var i in restaurants){
                
                if(count == 0 || count%4 == 0){
                //  main row
                    var mainRowDiv = document.createElement("div");
                    mainRowDiv.classList.add("row");
                }
                
                count = count + 1;
                
                //restaurant
                var restDiv = document.createElement("div");
                restDiv.classList.add("col-sm-3");
                mainRowDiv.appendChild(restDiv);
                
                // one
                var one = document.createElement("div");
                one.classList.add("row");
                restDiv.appendChild(one);
                
                //  two
                var two = document.createElement("div");
                two.classList.add("col-sm-12");
                two.classList.add("card");
                one.appendChild(two);
                
                //  three
                var three = document.createElement("div");
                three.classList.add("row");
                three.classList.add("card-items-row-padding-name");
                two.appendChild(three);
                
                //  four
                var four = document.createElement("div");
                four.classList.add("col-sm-12");
                four.classList.add("input-group");
                three.appendChild(four);
                
                //  five
                var five = document.createElement("div");
                five.classList.add("input-group-addon");
                four.appendChild(five);
                
                //  img
                var img = document.createElement("img");
                img.setAttribute("src", restaurants[i].thumb);
                img.setAttribute("alt", "IMG");
                img.setAttribute("height", "45");
                img.setAttribute("width", "45");
                five.appendChild(img);
                
                //  six
                var six = document.createElement("div");
                six.classList.add("input-group-addon");
                four.appendChild(six);
                
                //  h2
                var h3 = document.createElement("h3");
                var restaurantName = document.createTextNode(restaurants[i].name);
                h3.appendChild(restaurantName);
                six.appendChild(h3);
                
                //  seven
                var seven = document.createElement("div");
                seven.classList.add("row");
                seven.classList.add("card-items-row-padding-address");
                two.appendChild(seven);
                
                //  eight
                var eight = document.createElement("div");
                eight.classList.add("col-sm-2");
                seven.appendChild(eight);
                
                //  nine
                var nine = document.createElement("div");
                nine.classList.add("col-sm-10");
                var restaurantAddress = document.createTextNode(restaurants[i].address);
                nine.appendChild(restaurantAddress);
                seven.appendChild(nine);
                
                //  ten
                var ten = document.createElement("div");
                ten.classList.add("row");
                ten.classList.add("card-items-row-padding");
                two.appendChild(ten);
                
                //  eleven
                var eleven = document.createElement("div");
                eleven.classList.add("col-sm-12");
                var restaurantRatingAndText = document.createTextNode("Rating: " + restaurants[i].rating + " | " + restaurants[i].rating_text);
                eleven.appendChild(restaurantRatingAndText);
                ten.appendChild(eleven);
                
                //  twelve
                var twelve = document.createElement("div");
                twelve.classList.add("row");
                twelve.classList.add("card-items-row-padding");
                two.appendChild(twelve);
                
                //  thirteen
                var thirteen = document.createElement("div");
                thirteen.classList.add("btn-group");
                thirteen.setAttribute("role", "group");
                thirteen.setAttribute("aria-label", "ThreeButton");
                twelve.appendChild(eight);
                
                //  buttonOne
                var buttonOne = document.createElement("button");
                buttonOne.classList.add("btn");
                buttonOne.classList.add("btn-secondary");
                buttonOne.setAttribute("type", "button");
                buttonOne.setAttribute("onclick", "window.location.href=" + restaurants[i].menu_url);
                var restaurantMenu = document.createTextNode("Menu");
                buttonOne.appendChild(restaurantMenu);
                thirteen.appendChild(buttonOne);
                
                //  buttonTwo
                var buttonTwo = document.createElement("button");
                buttonTwo.classList.add("btn");
                buttonTwo.classList.add("btn-secondary");
                buttonTwo.setAttribute("type", "button");
                buttonTwo.setAttribute("onclick", "alert('Clicked Suggestion')");
                var restaurantSuggestion = document.createTextNode("Suggestion");
                buttonTwo.appendChild(restaurantSuggestion);
                thirteen.appendChild(buttonTwo);
                
                //  buttonThree
                var buttonThree = document.createElement("button");
                buttonThree.classList.add("btn");
                buttonThree.classList.add("btn-secondary");
                buttonThree.setAttribute("type", "button");
                buttonThree.setAttribute("onclick", "alert('Clicked Review')");
                var restaurantReview = document.createTextNode("Review");
                buttonThree.appendChild(restaurantReview);
                thirteen.appendChild(buttonThree);
                
                
                
                
                appendChildToPage.appendChild(mainRowDiv);
                
                
                
           
                console.log(restaurants[i].restaurant_id);
                console.log(restaurants[i].name);           //  Used
                console.log(restaurants[i].menu_url);       //  Used
                console.log(restaurants[i].thumb);          //  Used
                console.log(restaurants[i].address);        //  Used
                console.log(restaurants[i].city_id);        //  Not needed
                console.log(restaurants[i].rating);         //  Used
                console.log(restaurants[i].rating_text);    //  Used
            
                
                
            }
            
        }
    }
    httpReq.open("GET", "../php/getAllRestaurants.php?state="+state+"&city="+city+"&cuisine_id="+cuisine_id, true);
    httpReq.send(null);
    
}   