import{a as u,i as m,S as g}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();const f=document.getElementById("search-form"),p=document.getElementById("gallery"),i=document.querySelector(".loader"),l=document.getElementById("load-more"),a={key:"42334155-d8ef6d202703fa7fdc7903459",image_type:"photo",orientation:"horizontal",safesearch:!0,q:"",page:1,per_page:15};f.addEventListener("submit",async function(e){e.preventDefault(),i.style.display="block";const o=e.target.elements.input.value;a.q=o,a.page=1;try{const r=await d();h(r)}catch(r){console.log(r)}e.target.reset()});l.addEventListener("click",async function(){i.style.display="block",a.page++;try{const e=await d();y(e)}catch(e){console.log(e)}});async function d(){const e="https://pixabay.com/api/";try{return(await u.get(e,{params:a})).data}catch(o){throw new Error(o.response.status)}}function h(e){if(e.hits.length===0)m.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}),p.innerHTML="",l.style.display="none";else{const r=e.hits.map(t=>`<a class="gallery-link" href="${t.largeImageURL}">
        <img class="gallery-image"
        src="${t.webformatURL}"
        alt="${t.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${t.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${t.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${t.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${t.downloads}</span></p>
          </div>
          
        `).join("");p.innerHTML=r,l.style.display="block"}new g(".gallery-link").refresh(),i.style.display="none"}function y(e){const o=e.hits.map(t=>`<a class="gallery-link" href="${t.largeImageURL}">
        <img class="gallery-image"
        src="${t.webformatURL}"
        alt="${t.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${t.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${t.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${t.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${t.downloads}</span></p>
          </div>
          
        `).join("");p.innerHTML+=o,new g(".gallery-link").refresh(),i.style.display="none"}l.addEventListener("click",async function(){i.style.display="block",a.page++;try{const e=await d();e.totalHits<=a.page*a.per_page?(l.style.display="none",w()):(y(e),x())}catch(e){console.log(e)}});function w(){const e=document.createElement("div");e.textContent="We're sorry, but you've reached the end of search results.",e.classList.add("end-of-search-message"),document.body.appendChild(e)}function x(){const e=document.querySelector(".gallery-link").getBoundingClientRect().height;window.scrollBy({top:e*3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
