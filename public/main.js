function getLocalIPAddress() {
  $("#loading").show();
  return axios.get("https://api.ipify.org?format=json").then((res) => {
    return axios.get(`/${res.data.ip}`).then((data) => {
      return data.data;
    });
  });
}

let mymap = L.map("mapid").setView([0, 0], 13);
const attribution =
  '&copy; <a href="https://{s}.tile.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tile = L.tileLayer(tileUrl, { attribution });
tile.addTo(mymap);
let marker = L.marker([0, 0]).addTo(mymap);

getLocalIPAddress().then((res) => {
  mymap.panTo(new L.LatLng(res.location.lat, res.location.lng));
  marker.setLatLng(new L.LatLng(res.location.lat, res.location.lng));

  $(".ip").text(res.ip);
  $(".location").text(`${res.location.city}, ${res.location.country}`);
  $(".time").text(`UTC ${res.location.timezone}`);
  $(".isp-class").text(res.isp);
  $("#loading").hide();
});

$(".fa-chevron-right").click(() => {
  $("#loading").show();
  const ipInput = $("input").val();
  getGivenIPAddress(ipInput)
    .then((res) => {
      mymap.panTo(new L.LatLng(res.location.lat, res.location.lng));
      marker.setLatLng(new L.LatLng(res.location.lat, res.location.lng));

      $(".ip").text(res.ip);
      $(".location").text(`${res.location.city}, ${res.location.country}`);
      $(".time").text(`UTC ${res.location.timezone}`);
      $(".isp-class").text(res.isp);
      $("#loading").hide();
    })
    .catch((err) => {
      $("#loading").hide();
      $("input").val(err);
    });
});

function getGivenIPAddress(ip) {
  return axios
    .get(`/${ip}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      throw "Input correct IPv4 or IPv6 address.";
    });
}
