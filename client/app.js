let chirps;
// get request
const getChirps = () => {
  $.ajax({
    url: 'http://localhost:3000/api/chirps',
    success: result => {
      chirps = result;
      printChirps(chirps);
    }
  });
};
//call get chirps
getChirps();
//add event listener on post button
$('#btn0').click(() => {
  let data = {};
  data.user = $('#name').val();
  data.text = $('#text').val();
  let strData = JSON.stringify(data);
  let request = {
    method: 'POST',
    url: 'http://localhost:3000/api/chirps',
    contentType: 'application/json; charset=utf-8'
  };
  request.data = strData;
  // ajax post
  $.ajax(request);
  //reset form values
  $('#name').val('');
  $('#text').val('');
  //print chirps
  getChirps();
  printChirps(chirps);
});
const printChirps = chirps => {
  let htmlString = ``;
  for (chirp in chirps) {
    if (chirps[chirp].user !== undefined) {
      htmlString += `<div id="card${chirp}" class="card" style={{ width: '54rem' }}>
            <div class="card-title">
              <button id="${chirp}" class="btn btn-dark deleteBtn">X</button>
            </div>
            <div class="card-body">
            <h1>${chirps[chirp].user}</h1>
              <h1>${chirps[chirp].text}</h1>
            </div>
          </div>
          `;
    }
    $('#chirpContainer').html(htmlString);
  }
};
//add event listener to delete chirps
$('#chirpContainer').on('click', '.deleteBtn', function() {
  delChirp(this.id);
  //delete element from page
  $(`#card${this.id}`).remove();
});
//add delete request
const delChirp = id => {
  let data = {};
  data.id = id;
  let strData = JSON.stringify(data);
  let request = {
    url: 'http://localhost:3000/api/chirps',
    type: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    success: function(result) {
      console.log(result);
    }
  };
  request.data = strData;
  // ajax post
  $.ajax(request);
};