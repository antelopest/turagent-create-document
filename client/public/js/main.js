$(function () {

  // ***************************************************************************************
  // ROUTING - ACTIVE LINK 
  // Routes 
  var location = window.location.href;
  var currentUrl = '/' + location.split('/').pop();
  // Active Route
  $('nav ul li a').each(function () {
    var link = $(this).attr('href');

    if (currentUrl == link) {
      $(this).addClass('active');
    }
  });
  $('header button').click(() => {
    window.location.href = 'createcontract';
  });
  // ***************************************************************************************
  
  // ***************************************************************************************
  // CREATE CONTRACT

  // CONTRACT
  $('#contract_Date').val(todayDate());
 
  // CLIENT
  $('#client_Tourist').change(() => {

    if (formClientValidator()) {
      $('#tourist_Surname').val($('#client_Surname').val());
      $('#tourist_Name').val($('#client_Name').val());
      $('#tourist_Patronymic').val($('#client_Patronymic').val());
      $('#tourist_DateOfBirth').val($('#client_DateOfBirth').val());
    }

  });

  // TOURIST
  var iTourist = null;

  $('#bAddTourist').click(() => {
    if (iTourist != null) aTourist.splice(iTourist, 1);
    if (formTouristValidator()) {
      createTourist($('#tourist_Surname').val(), $('#tourist_Name').val(),
        $('#tourist_Patronymic').val(), $('#tourist_DateOfBirth').val(),
        $('#tourist_Serie').val(), $('#tourist_Number').val());
      clearFormTourist();
      createTableTourist();
    }
    iTourist = null;
  });

  $('#bRemoveTourist').click(() => {
    if (iTourist != null) aTourist.splice(iTourist, 1);
    clearFormTourist();
    createTableTourist();
    iTourist = null;
  });

  $(document).on("click", "tbody tr", function () {
    clearFormTourist();
    var index = Number($(this).attr('id'));
    $('#tourist_Surname').val(aTourist[index].Surname);
    $('#tourist_Name').val(aTourist[index].Name);
    $('#tourist_Patronymic').val(aTourist[index].Patronymic);
    $('#tourist_DateOfBirth').val(aTourist[index].DateOfBirth);
    $('#tourist_Serie').val(aTourist[index].zSerie);
    $('#tourist_Number').val(aTourist[index].zNumber);
    iTourist = index;
  });

  var createTableTourist = () => {
    $('#tableTourist').find('tbody').children().remove();
    aTourist.forEach((element, index) => {
      $('#tableTourist').find('tbody')
        .append($('<tr>')
          .attr('id', index)
          .attr('class', 'tr-field')
          .append($('<th>')
            .text(++index)
          )
          .append($('<td>')
            .text(element.fullName)
          )
          .append($('<td>')
            .text(element.DateOfBirth)
          )
          .append($('<td>')
            .text(element.passport)
          )
        )
    });
  };
  
  // TOUR 
  $('#tour_numberSum').blur(() => {
    $('#tour_stringSum').val(sum_propis($('#tour_numberSum').val()));
  });

  $('#tour_stringSum').val('ноль');

  // STATUS
  $('#b_Status').on('click', function() {
    // проверить ТУР на валидность
    var valid = true;
    
    if (formContractValidator()) {
      $('#status_Contract').html("<div class='text-success'>Выполнено</div>");
    } else {
      $('#status_Contract').html("<div>Не выполнено</div>");
      valid = false;
    };

    if (formClientValidator()) {
      $('#status_Client').html("<div class='text-success'>Выполнено</div>");
    } else {
      $('#status_Client').html("<div>Не выполнено</div>");
      valid = false;
    }

    if (aTourist.length != 0) {
      $('#status_Tourist').html("<div class='text-success'>Выполнено</div>");
    } else {
      $('#status_Tourist').html("<div>Не выполнено</div>");
      valid = false;
    }

    if (formTourValidator()) {
      $('#status_Tour').html("<div class='text-success'>Выполнено</div>");
    } else {
      $('#status_Tour').html("<div>Не выполнено</div>");
      valid = false;
    }

    if (valid) {
      $('#b_CreateDocument').prop('disabled', false);
    }
  });

  $('#b_CreateDocument').on('click', () => {

    createContract(
      $('#contract_Number').val(), 
      $('#contract_Date').val()
    );
    
    createClient(
      $('#client_Surname').val(),
      $('#client_Name').val(),
      $('#client_Patronymic').val(),
      $('#client_DateOfBirth').val(),
      $('#client_Serie').val(),
      $('#client_Number').val(),
      $('#client_Date').val(),
      $('#client_Who').val(),
      $('#client_Code').val(),
      $('#client_Address').val(),
      $('#client_Phone').val()
    );

    createTour(
      $('#tour_TourOperator option:selected').val(),
      $('#tour_Departure').val(),
      $('#tour_Arrival').val(),
      $('#tour_Start').val(),
      $('#tour_End').val(),
      $('#tour_Lasting').val(),
      $('#tour_Hotel').val(),
      $('#tour_Placement').val(),
      $('#tour_Food option:selected').val(),
      $('#tour_Shipping').val(),
      $('#tour_Transfer').val(),
      $('#tour_Excursion option:selected').val(),
      $('#tour_Visa').val(),
      $('#tour_DateVisa').val(),
      $('#tour_MedicalInsurance option:selected').val(),
      $('#tour_TravelInsurance option:selected').val(),
      $('#tour_numberSum').val(),
      $('#tour_stringSum').val()
    );
    
    var req = new XMLHttpRequest();
    req.open("POST", '/download', true);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.responseType = "blob";

    req.onload = function(event) {
      var blob = req.response;
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = oContract.sNumber + '-' + oClient.Surname + '-' + oTour.TourOperator + ".docx";
      link.click();
    }
    
    req.send(JSON.stringify({oContract, oClient, aTourist, oTour}));
  });

  $('#b_TestSend').on('click', () => {
    // MAIN FUNCTION
    console.log('Договор');

    createContract('2000', '11 августа 2018');
    console.log(oContract);

    console.log('Клиент');
    
    createClient('Беленко', 'Семен', 'Юрьевич', '11.03.1993', '8787', '878787', '20.07.2010', 'УФМС в городе Ухте', '110-622', 'ул. Тиманская 1-62', '89125625344');
    console.log(oClient);

    console.log('Туристы');

    createTourist('Беленко', 'Семен', 'Юрьевич', '11.03.1993', '8787', '878787');
    createTourist('Беленко', 'Татьяна', 'Витальевна', '11.03.1993', '8787', '878787');
    console.log(aTourist);


    console.log('Тур');

    createTour('Coral', 'Москва', 'Аланья', 'Москва', '11.10.2018', '21.10.2018', '10', 'First Class Hotel', 'Double', 'AI', 'Да', 'Групповой', 'Нет', '-', '-', 'Да', 'Нет', '700', 'семьсот');
    console.log(oTour);
    
    var req = new XMLHttpRequest();
    req.open("POST", '/download', true);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.responseType = "blob";

    req.onload = function(event) {
      var blob = req.response;
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "2010 - Belenko - Coral" + ".docx";
      link.click();
    }
    
    req.send(JSON.stringify({oContract, oClient, aTourist, oTour}));
  });


  // Validator - Form
  var formContractValidator = () => {
    valid = true;

    $('#form_contract input[type="text"]').each(function () {
      if (!$(this).val() || $(this).val() == '') valid = false;
      
    });

    return valid;
  }

  var formClientValidator = () => {
    valid = true;

    $('#form_client input[type="text"]').each(function () {
      if (!$(this).val() || $(this).val() == '') valid = false;
    });

    return valid;
  }

  var formTouristValidator = () => {
    valid = true;

    $('#form_tourist input[type="text"]').each(function () {
      if (!$(this).val() || $(this).val() == '') valid = false;
    });

    return valid;
  }

  var formTourValidator = () => {
    var valid = true;

    $('#form_tour input[type="text"]').each(function() {
      if (!$(this).val() || $(this).val() == '') valid = false;
    });

    return valid;
  }

  var clearFormTourist = () => {
    $('#form_tourist input[type="text"]').each(function () {
      $(this).val('');
    });
  }
});

