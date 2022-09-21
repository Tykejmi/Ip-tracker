const search = document.querySelector(".search-input")

var map = L.map('map').setView([0, 0], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


let ipApi = {

	key: "at_Ocn27lOccsgU9LHIYs1qZIsdGkosq",

	fetchApi: function(ipInput){
		fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${this.key}&ipAddress=${ipInput}`)
		.then(res => res.json())
		.then(data => this.handleData(data))
		.catch(err=>{
			if (err) {
				alert("invalid IP try again\n (Try disabling AdBlock)")
				search.value = ""
			}
		})	
	
	},

	handleData: function(data){
		console.log(search.value)
		const {country, timezone, lat, lng} = data.location
		const {isp, ip} = data
	
		map.setView([lat,lng])
		var marker = L.marker([lat,lng]).addTo(map);
		
		function clickHandle(){
		    ipApi.fetchApi(search.value)
			
		}

		function keyUpHandle(e){
			console.log(e.key)
			if(e.keyCode == 13){
		    ipApi.fetchApi(search.value)
			}
		}
	
		document.querySelector(".location").innerText = country
		document.querySelector(".timezone").innerText = ` UTC ${timezone}`
		document.querySelector(".isp").innerText = isp
		document.querySelector(".ip").innerText = ip
		document.querySelector(".button").addEventListener("click", clickHandle)
		search.addEventListener("keyup", keyUpHandle)

	},


}

ipApi.fetchApi("")