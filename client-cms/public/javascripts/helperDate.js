let httpData = 'http://localhost:8888/api/datadate';
let tokenX = localStorage.getItem('token');


//READ
const loadData = () => {
    $.ajax({
        url: httpData,
        method: 'GET',
    })
        .done(function (data) {
            let html = "";
            console.log(data)
            if (data.success) {
                data.dataList.forEach(function (item, i) {
                    html += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.id}</td>
                  <td>${item.letter}</td>
                  <td>${item.frequency}</td>
                  <td id="getUpset">                      
                      <button type="button"  class="btnEdit btn btn-success" >update</button>
                      <button type="button" id="${item.id}" class="btnDel btn btn-danger">delete</button>
                      
                  </td>
                </tr>`
                })

            }
            $('table tbody').html(html);
            searchByLetter()
            searchByFrequency()
        });
}

//UPDATE
const updateData = (dataId) => {
    
    let data = {
        letter: $('#addletter').val(),
        frequency: $('#addfrequency').val()
      }
      
    $.ajax({
        url: `${httpData}/${dataId}?x_auth=${tokenX}`,
        method: 'PUT',  
        data      
      })
      .done(function(){
        $('#addletter').val('');
        $('#addfrequency').val('');
        $('#rahasia').val('')
        $('#formAdd').hide()
        loadData();
      })
    
}

//DELETE
const deleteData = (dataId) => {
    $.ajax({
        url: `${httpData}/${dataId}?x_auth=${tokenX}`,
        method: "DELETE",
    })
        .done(function () {
            loadData();
            $('#myModalDel').modal('toggle');
        });
}

//CREATE
const addData = () => {
    $.ajax({
        method: "POST",
        url: `${httpData}?x_auth=${tokenX}`,
        dataType: "json",
        data: {
            letter: $('#addletter').val(),
            frequency: $('#addfrequency').val()
        }
    })
        .done(function () {
            loadData();
        });
}

//DISPLAY MODAL
const applyModal = () => {
    $("#dataTable").on("click", "tbody tr .btnDel", function (e) {
        let cekVal = e.currentTarget.id
        $('#myModalDel').modal();
        $('#myModalDel #mauDel').text(cekVal);
    });
    $("#dataTable tbody").on("click", "tr .btnEdit", function (el) {
        let letterId = $(this).closest('tr').children()[1].innerText
        let det = $(this).closest('tr').children()[2].innerText.split(" ")
        let frequency = $(this).closest('tr').children()[3].innerText
        
        det = `${det[2]}-${getMonthFromString(det[1])}-${det[0]}`
        
        $('#addletter').attr('value', det)
        $('#addfrequency').attr('value', frequency)
        $('#rahasia').attr('value', letterId)
        $('#formAdd').show();

    });
}

//BROWSE
const searchByLetter = () => { //CHILD 2

    $("#searchletter").on("keyup", function () {
        let value = $(this).val().toLowerCase();

        $("#myTable tr").filter(function () {
            let cek = $(this).children()[2].innerText.toLowerCase().indexOf(value) > -1
            $(this).toggle(cek)
        });
    });

}

const searchByFrequency = () => { //CHILD 3

    $("#searchfrequency").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            let cek = $(this).children()[3].innerText.toLowerCase().indexOf(value) > -1
            $(this).toggle(cek)
        });
    });


}

function getMonthFromString(mon){
    let slut= new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
    if(slut<10){
        slut = `0${slut}`
    }
    return slut
 }