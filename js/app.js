
const newsApiKey = `5f9f443557f145018cffca6760b150a8`;
const guardianApiKey = `ede7b4ab-8ef2-42e2-8029-f345c6c4a4dc`;
const redditApiKey = `https://www.reddit.com/hot.json`;

// code for CORS issues
//  https://accesscontrolalloworiginall.herokuapp.com/

const newsApiEndPoint =  `https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;
const guardianApiKeyEndPoint = `https://content.guardianapis.com/search?api-key=${guardianApiKey}`;


const mainArticleContainer = document.querySelector('#main')
const loaderDiv = document.querySelector("#popUp");

let articleUrl, description, publication, thumbnail, title, timestamp = ''

const source1Button = document.querySelector ("#source1");
const source2Button = document.querySelector ("#source2");
const source3Button = document.querySelector ("#source3");
const source4Button = document.querySelector ('section a');
const source5Button = document.querySelector ('section nav section button');
const searchSection1 = document.querySelector("#text1");



source1Button.addEventListener("click", getNewsApi)
source2Button.addEventListener("click", getGuardianApi)
source3Button.addEventListener("click", getRedditApi)
source4Button.addEventListener("click", refreshPage)
source5Button.addEventListener("click", searchBar)





searchSection1.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    searchBar(event);
searchSection1.value = "";
  }});




/* this function links "bryans news api" as a button and refreshes back to defualt page with a clear console */
function refreshPage() {
  window.location.reload()
  
}





/* below trying to get the user input in the search feild to be input into the api news link bring up a list of there tailored results */

function searchBar(userInput) {
var str = document.getElementById("text1").value;
  const searchApi = `https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/everything?q=${str}&from=2022&sortBy=relevancy&apiKey=${newsApiKey}`;
   loaderDiv.classList.remove("hidden");
  mainArticleContainer.innerHTML = "";
  

    fetch(searchApi)
    .then((response) => response.json())
    .then((data) => { 
        console.log(data);
        data.articles.forEach(article => {
            
        articleUrl = article.url
        description = article.description || ''
        publication = article.source.name
        thumbnail = article.urlToImage || './images/articles_placeholder_1.jpg'
        title = article.title
        timestamp = new Date(article.publishedAt) || ''
        console.log (articleUrl, description, publication, thumbnail, title, timestamp);
        
      
        let newArticleNode = document.createElement('div')
        console.log(newArticleNode);
        
        newArticleNode.innerHTML = `<article class="article">
        <section class="featuredImage">
        <img src="${thumbnail}" alt="" />
        </section>
        <section class="articleContent">
            <a href="${articleUrl}"><h3>${title}</h3></a>
            <h6>${publication}</h6>
        </section>
        <section class="impressions">
          ${timestamp}
        </section>
        <div class="clearfix"></div>
      </article>`
            mainArticleContainer.append(newArticleNode);
        console.log(newArticleNode);
      
  })
  loaderDiv.classList.add("hidden");
})


   
   console.log(str + " i got clicked");
   loaderDiv.classList.add("hidden");
}




function getRedditApi() {
  loaderDiv.classList.remove("hidden");
  mainArticleContainer.innerHTML = "";

  fetch(redditApiKey)
  .then((response) => response.json())
  .then((data) => { 
      console.log(data);
      data.data.children.forEach((article) => {
          
      articleUrl = article.data.url
      description = article.data.title || ''
      publication = article.data.subreddit
      thumbnail = article.data.thumbnail || './images/articles_placeholder_1.jpg'
      title = article.data.title
      timestamp = new Date(article.webPublicationDate) || ''
      console.log (articleUrl, description, publication, thumbnail, title, timestamp);

      let newArticleNode = document.createElement('div')
      console.log(newArticleNode);
  
      newArticleNode.innerHTML = `<article class="article">
      <section class="featuredImage">
      <img src="${thumbnail}" alt="" />
      </section>
      <section class="articleContent">
          <a href="${articleUrl}"><h3>${title}</h3></a>
          <h6>${publication}</h6>
      </section>
      <section class="impressions">
        ${timestamp}
      </section>
      <div class="clearfix"></div>
    </article>`
          mainArticleContainer.append(newArticleNode);
      console.log(newArticleNode);

     
     })
     loaderDiv.classList.add("hidden");
  })
  }






function getNewsApi() {

  loaderDiv.classList.remove("hidden");
  mainArticleContainer.innerHTML = "";

fetch(newsApiEndPoint)
        .then((response) => response.json())
        .then((data) => { 
            console.log(data);
            data.articles.forEach(article => {
                
            articleUrl = article.url
            description = article.description || ''
            publication = article.source.name
            thumbnail = article.urlToImage || './images/articles_placeholder_1.jpg'
            title = article.title
            timestamp = new Date(article.publishedAt) || ''
            console.log (articleUrl, description, publication, thumbnail, title, timestamp);
            
          
            let newArticleNode = document.createElement('div')
            console.log(newArticleNode);
            
            newArticleNode.innerHTML = `<article class="article">
            <section class="featuredImage">
            <img src="${thumbnail}" alt="" />
            </section>
            <sectionclass="articleContent">
                <a href="${articleUrl}" ><h3>${title}</h3></a>
            
                <h6>${publication}</h6>
            </section>
            <section class="impressions">
              ${timestamp}
            </section>
            <div class="clearfix"></div>
          </article>`
                mainArticleContainer.append(newArticleNode);
            console.log(newArticleNode);
          
      })
      loaderDiv.classList.add("hidden");
   })
}


function getGuardianApi() {

  loaderDiv.classList.remove("hidden");
  mainArticleContainer.innerHTML = "";

  fetch(guardianApiKeyEndPoint)
          .then((response) => response.json())
          .then((data) => { 
              console.log(data);
              data.response.results.forEach((article) => {
                articleUrl = article.webUrl;
                description = article.webTitle || "";
                publication = article.sectionName;
                thumbnail = article.urlToImage || "./images/article_placeholder_1.jpg";
                title = article.webTitle;
                timestamp = new Date(article.webPublicationDate) || "";
                console.log(articleUrl, description, publication, thumbnail, title, timestamp);

                let newArticleNode = document.createElement('div')
                console.log(newArticleNode);
                
                newArticleNode.innerHTML = `<article class="article">
                <section class="featuredImage">
                <img src="${thumbnail}" alt="" />
                </section>
                <section class="articleContent">
                    <a href="${articleUrl}"><h3>${title}</h3></a>
                    <h6>${publication}</h6>
                </section>
                <section class="impressions">
                  ${timestamp}
                </section>
                <div class="clearfix"></div>
              </article>`
                    mainArticleContainer.append(newArticleNode);
                console.log(newArticleNode);
             
          })
          loaderDiv.classList.add("hidden");
        })
}

