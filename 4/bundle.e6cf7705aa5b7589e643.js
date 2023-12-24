(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:o,d:a,D:d,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=v;var $=function(t){return t instanceof D},b=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;g[o]=e,s=o}return!i&&s&&(y=s),s||!i&&y},M=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},w=_;w.l=b,w.i=$,w.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return w},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!w.u(e)||e,f=w.p(t),p=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(a)},h=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case u:return c?p(1,0):p(31,11);case l:return c?p(1,m):p(0,m+1);case o:var g=this.$locale().weekStart||0,$=(v<g?v+7:v)-g;return p(c?_-$:_+(6-$),m);case a:case d:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,c=w.p(t),f="set"+(this.$u?"UTC":""),p=(o={},o[a]=f+"Date",o[d]=f+"Date",o[l]=f+"Month",o[u]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[c],h=c===a?this.$D+(e-this.$W):e;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[p](h),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[w.p(t)]()},m.add=function(n,c){var d,f=this;n=Number(n);var p=w.p(c),h=function(t){var e=M(f);return w.w(e.date(e.date()+Math.round(t*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===u)return this.set(u,this.$y+n);if(p===a)return h(1);if(p===o)return h(7);var v=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[p]||1,m=this.$d.getTime()+n*v;return w.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return w.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:u(n.monthsShort,o,c,3),MMMM:u(c,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:d(1),hh:d(2),a:p(r,a,!0),A:p(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,f){var p,h=w.p(d),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=w.m(this,v);return y=(p={},p[u]=y/12,p[l]=y,p[c]=y/3,p[o]=(_-m)/6048e5,p[a]=(_-m)/864e5,p[r]=_/e,p[s]=_/t,p[i]=_/1e3,p)[h]||_,f?y:w.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return w.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),T=D.prototype;return M.prototype=T,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=b,M.isDayjs=$,M.unix=function(t){return M(1e3*t)},M.en=g[y],M.Ls=g,M.p={},M}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class i{getTemplate(){return'\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>\n  '}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}var r=n(484),a=n.n(r);const o=(t,e)=>{const n=t+Math.random()*(e+1-t);return Math.floor(n)},l=t=>t[o(0,t.length-1)];function c(t){return t?a()(t).format("YYYY-MM-DDTHH:mm"):""}function u(t){return t?a()(t).format("DD/MM/YY HH:mm"):""}function d(t){return t?a()(t).format("hh:mm"):""}class f{constructor({point:t,destination:e,selectedOffers:n=[]}){this.point=t,this.destination=e,this.offers=n}getTemplate(){return function(t,e,n){const i=(s=t.dateFrom)?a()(s).format("MMM DD"):"";var s;const r=c(t.dateFrom),o=c(t.dateTo),l=function(t){return t?a()(t).format("YYYY-MM-DD"):""}(t.dateFrom),u=d(t.dateFrom),f=d(t.dateTo),{minutes:p,hours:h,days:v}=function(t,e){let n=0,i=0,s=0;return n=(new Date(e).getTime()-new Date(t).getTime())/6e4,n>=60&&(i=Math.floor(n/60),n=Math.floor(n%60)),i>23&&(s=Math.floor(i/24),i=Math.floor(i%24)),{minutes:n,hours:i,days:s}}(t.dateFrom,t.dateTo);return console.log("minutes: ",p," hours:",h," days:",v),`\n  <li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${l}">${i}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${t.type}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${t.type} ${e.name}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${r}">${u}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${o}">${f}</time>\n        </p>\n        <p class="event__duration">\n          ${v?`${v}D `:""}\n          ${h}H\n          ${p}M\n        </p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${t.basePrice}</span>\n      </p>\n\n      ${n.length>0?`\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n        ${n.map((t=>`<li class="event__offer">\n        <span class="event__offer-title">${t.title}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </li>`)).join("")}\n      </ul>`:""}\n\n      <button class="event__favorite-btn ${t.isFavorite?"":"event__favorite-btn--active"}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>\n  `}(this.point,this.destination,this.offers)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const p=["Chamonix","Geneva","Paris","London","Moscow","Berlin","New York","San-Francisco","Dubai"],h=["Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.","London is the capital and largest city of England and the United Kingdom, with a population of just under 9 million.","Chamonix, is a beautiful city, a true asian pearl, with crowded streets.","Berlin is the capital and largest city of Germany by both area and population. Its more than 3.85 million inhabitants make it the European Union's most populous city, according to population within city limits","Paris is the capital and most populous city of France. Since the 17th century, Paris has been one of the world's major centres of finance, diplomacy, commerce, culture, fashion, gastronomy and many area.","Moscow is the capital and largest city of Russia. The city stands on the Moskva River with a population estimated at 13.0 million residents within the city limits, over 18.8 million residents in the urban area, and over 21.5 million residents in the metropolitan area","Situated on one of the world's largest natural harbors, New York City comprises five boroughs, each of which is coextensive with a respective county","San Francisco, officially the City and County of San Francisco, is the commercial, financial, and cultural center of Northern California","Established in the 19th century as a small fishing village, Dubai grew into a regional trading hub from the early 20th century and grew rapidly in the late 20th and early 21st century with a focus on tourism and luxury, having the second most five-star hotels in the world, and the tallest building in the world, the Burj Khalifa, which is 828 metres (2,717 ft) tall."],v=["Night view of the city","Crowded streets of the city","The beautiful city","City's kyscrapers","The most stunning view of the city","City colors","City transport"],m=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],_=["Upgrade to a business class","Extra space","Add luggage","Switch to comfort class","Add meal","Choose seats","Travel by train"];class y{constructor({point:t,destination:e,availableOffers:n,selectedOffers:i=[]}){this.point=t,this.destination=e,this.availableOffers=n,this.selectedOffers=i}getTemplate(){return function(t,e,n,i){const s=u(t.dateFrom),r=u(t.dateTo);return`\n  <li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${t.type}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n\n              ${m.map((t=>`\n  <div class="event__type-item">\n    <input id="event-type-${t.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t.toLowerCase()}">\n    <label class="event__type-label  event__type-label--${t.toLowerCase()}" for="event-type-${t.toLowerCase()}-1">${t}</label>\n  </div>\n  `)).join("")}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${t.type}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${e?e.name:""}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            ${p.map((t=>`<option value="${t}"></option>`)).join("")}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${s}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${r}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${t.basePrice}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n\n      <section class="event__details">\n        ${function(t,e=[]){return 0===t.length?"":`\n  <section class="event__section  event__section--offers">\n  <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n  <div class="event__available-offers">\n    ${t.map((t=>{const n=e.includes(t.id),i=t.title.toLowerCase().split(" ").join("-");return`\n      <div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}-1" type="checkbox" name="event-offer-${i}" ${n?"checked":""}>\n        <label class="event__offer-label" for="event-offer-${i}-1">\n          <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t.price}</span>\n        </label>\n      </div>\n    `})).join("")}\n    </div>\n  </section>\n  `}(n,i)}\n        ${function(t){return t?`\n    <section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      ${t.description?`<p class="event__destination-description">${t.description}</p>`:""}\n\n      ${t.pictures.length>0?(e=t.pictures,e?`\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n        ${e.map((t=>`\n          <img class="event__photo" src="${t.src}" alt="${t.description}">\n        `)).join("")}\n      </div>\n    </div>`:""):""}\n    </section>`:"";var e}(e)}\n      </section>\n    </form>\n  </li>\n  `}(this.point,this.destination,this.availableOffers,this.selectedOffers)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const g={id:crypto.randomUUID(),basePrice:0,dateFrom:null,dateTo:null,destination:"",isFavorite:!1,offers:[],type:"Flight"},$=document.querySelector(".trip-controls__filters"),b=document.querySelector(".trip-main"),M=document.querySelector(".trip-events"),w=new class{destinations=[];offers=[];points=[];constructor(){this.destinations=this.generateDestinations(),this.offers=this.generateOffers(),this.points=this.generatePoints()}generateDestinations(){return Array.from({length:15},(()=>({id:crypto.randomUUID(),description:l(h),name:l(p),pictures:Array.from({length:o(0,10)},(()=>({src:`https://loremflickr.com/248/152?random=${o(0,10)}`,description:l(v)})))})))}generateOffers(){return m.map((t=>({type:t,offers:Array.from({length:o(0,7)},(()=>({id:crypto.randomUUID(),title:l(_),price:o(50,200)})))})))}generatePoints(){return Array.from({length:10},(()=>{const t=l(m),e=l(this.destinations),n=!!o(0,1),i=this.offers.find((e=>e.type===t)),s=n?i.offers.map((t=>t.id)).slice(0,i.offers.length-1):[];return function(t,e,n){return{id:crypto.randomUUID(),basePrice:o(1e3,2e3),dateFrom:new Date(2024,1,o(0,31),o(7,23),o(0,59)),dateTo:new Date(2024,2,o(0,31),o(7,23),o(0,59)),destination:t,isFavorite:!!o(0,1),offers:n,type:e}}(e.id,t,s)}))}getDestinations(){return this.destinations}getOffers(){return this.offers}getPoints(){return this.points}},D=new class{constructor(t){this.destinations=t.getDestinations()}getDestinations(){return this.destinations}getById(t){return this.destinations.find((e=>e.id===t))}}(w),T=new class{constructor(t){this.offers=t.getOffers()}getOffers(){return this.offers}getByType(t){return this.offers.find((e=>e.type===t))}getByTypeAndIds(t,e){let n=[];return n=this.getByType(t).offers.filter((t=>e.includes(t.id))),n}}(w),S=new class{constructor(t){this.points=t.getPoints()}getPoints(){return this.points}}(w),O=new class{eventsListComponent=new s;constructor({container:t,pointsModel:e,destinationsModel:n,offersModel:i}){this.mainContainer=t,this.pointsModel=e,this.destinationsModel=n,this.offersModel=i}init(){this.points=[...this.pointsModel.getPoints()],e(new i,this.mainContainer),e(this.eventsListComponent,this.mainContainer),e(new y({point:g,destination:null,availableOffers:this.offersModel.getByType(this.points[0].type).offers}),this.eventsListComponent.getElement()),e(new y({point:this.points[0],destination:this.destinationsModel.getById(this.points[0].destination),availableOffers:this.offersModel.getByType(this.points[0].type).offers,selectedOffers:this.offersModel.getByTypeAndIds(this.points[0].type,this.points[0].offers)}),this.eventsListComponent.getElement());for(let t=1;t<this.points.length;t++){const n=this.offersModel.getByTypeAndIds(this.points[t].type,this.points[t].offers);e(new f({point:this.points[t],destination:this.destinationsModel.getById(this.points[t].destination),offers:n}),this.eventsListComponent.getElement())}}}({container:M,pointsModel:S,destinationsModel:D,offersModel:T});e(new class{getTemplate(){return'\n  <form class="trip-filters" action="#" method="get">\n    <div class="trip-filters__filter">\n      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n      <label class="trip-filters__filter-label" for="filter-future">Future</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n      <label class="trip-filters__filter-label" for="filter-present">Present</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n      <label class="trip-filters__filter-label" for="filter-past">Past</label>\n    </div>\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>\n'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},$),e(new class{getTemplate(){return'\n  <section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>\n'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},b,"afterbegin"),O.init()})()})();
//# sourceMappingURL=bundle.e6cf7705aa5b7589e643.js.map