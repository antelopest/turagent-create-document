'use strict'

const express = require('express');
const router = express.Router();

var path = require('path');
var fs = require('fs');
var JSZip = require('jszip');
var docxtemplater = require('docxtemplater');

router.get('/', (req, res) => {
  res.render('contracts');
});

router.get('/contracts', (req, res) => {
  res.render('contracts');
});

router.get('/departures', (req, res) => {
  res.render('departures');
});

router.get('/clients', (req, res) => {
  res.render('clients');
});

router.get('/createcontract', (req, res) => {
  res.render('createcontract');
});

router.get('/upload', (req, res) => {



  res.setHeader('content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  var file = path.join(__dirname + '../../../documents/doc.docx');
  res.download(file);
});

router.post('/download', (req, res) => {

  var oContract = req.body.oContract;
  var oClient = req.body.oClient;
  var oTour = req.body.oTour;
  var sTourPath_1 = `Маршрут: ${oTour.Departure} - ${oTour.Arrival} - ${oTour.Return}` + '^p' +
    `Начало тура: ${oTour.Start} Окончание тура: ${oTour.End}  <w:p>User Is {@user}</w:p> Окончание тура: ${oTour.Lasting}` + '\n';
  var sTourPath_2 = `Отель: ${oTour.Hotel} Размещение: ${oTour.Placement} Питание: ${oTour.Food} \n
  Перевозка: ${oTour.Shipping} Трансфер: ${oTour.Transfer}'
  Экскурсионная программа: ${oTour.Excursion} Виза: ${oTour.Visa} Срок сдачи документов на визу: ${oTour.DateVisa} '\n'
  Медицинская страховка: ${oTour.MedicalInsurance} Страховка от невыезда: ${oTour.TravelInsurance}`;



  var aTourist = req.body.aTourist;
  var sTourist = '';
  aTourist.forEach(element => {
    sTourist = sTourist + 'ФИО: ' + element.Surname + ' ' + element.Name + ' ' +
      element.Patronymic + '     Дата рождения: ' + element.DateOfBirth +
      '     ОЗП: ' + element.zSerie + ' ' + element.zNumber +
      '\n';
  });

  var content = fs.readFileSync(path.resolve(__dirname + '../../../documents/TourOperator', 'doc.docx'), 'binary');
  var zip = new JSZip(content);
  var doc = new docxtemplater();
  doc.loadZip(zip);

  console.log(sTourist);

  doc.setData({
    // Contract
    contract_Number: oContract.cNumber,
    contract_Date: oContract.cDate,
    contract_Year: oContract.cDate.substr(oContract.cDate.length - 4, 4),

    // Client
    client_FIO: oClient.Surname + ' ' + oClient.Name + ' ' + oClient.Patronymic,
    client_DateOfBirth: oClient.DateOfBirth,
    client_Serie: oClient.rSerie,
    client_Number: oClient.rNumber,
    client_Date: oClient.rDate,
    client_Who: oClient.rWho,
    client_Code: oClient.rCode,
    client_Address: oClient.rAddress,
    client_Phone: oClient.Phone,
    /* авиаперелет - чартерный рейс / регулярный - эконом / бизнес класс  / нет */
    // Tourist
    tourist: sTourist,
    // Tour
    tour_Path_1: sTourPath_1,
    tour_Path_2: sTourPath_2
  });

  doc.render();

  var buf = doc.getZip().generate({ type: 'nodebuffer' });
  fs.writeFileSync(path.resolve(__dirname + '../../../documents', 'output.docx'), buf);

  res.setHeader('content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.download(path.resolve(__dirname + '../../../documents/', 'output.docx'));

});

router.get('/download', (req, res) => {
  var oTour = {
    TourOperator: 'Coral',
    Departure: 'Москва',
    Arrival: 'Анталия',
    Return: 'Москва',
    Start: '11.06.2018',
    End: '22.06.2018',
    Lasting: '10',
    Hotel: 'Gregory Office 5*',
    Placement: 'Double',
    Food: 'Все включено',
    Shipping: 'Авиаперелет - чартерный / регулярный рейс - эконом класс',
    Transfer: 'Групповой с русскоговорящим гидом',
    Excursion: 'Нет',
    Visa: 'Нет',
    DateVisa: '-',
    MedicalInsurance: 'Да',
    TravelInsurance: 'Нет',
    NumberSum: '70000',
    StringSum: 'семьдесят тысяч рублей'
  };

  

  // var sTourRoute = `Маршрут: ${oTour.Departure} - ${oTour.Arrival} - ${oTour.Return}`;
  // var sTourDate = `Начало тура: ${oTour.Start} Окончание тура: ${oTour.End} Окончание тура: ${oTour.Lasting}`;
  // var sTourHotel = `Отель: ${oTour.Hotel} Размещение: ${oTour.Placement} Питание: ${oTour.Food}`;
  // var sTourVisa = 

  var sTourPath_1 = `Маршрут: ${oTour.Departure} - ${oTour.Arrival} - ${oTour.Return}` + '\n' +
    `Начало тура: ${oTour.Start} Окончание тура: ${oTour.End} Окончание тура: ${oTour.Lasting}`;

  var sTourPath_2 = `Отель: ${oTour.Hotel} Размещение: ${oTour.Placement} Питание: ${oTour.Food}` +
    `Перевозка: ${oTour.Shipping} Трансфер: ${oTour.Transfer} Экскурсионная программа: ${oTour.Excursion}` +
    `Виза: ${oTour.Visa} Срок сдачи документов на визу: ${oTour.DateVisa}` +
    `Медицинская страховка: ${oTour.MedicalInsurance} Страховка от невыезда: ${oTour.TravelInsurance}`;
  
  var content = fs.readFileSync(path.resolve(__dirname + '../../../documents', 'tour.docx'), 'binary');
  var zip = new JSZip(content);
  var doc = new docxtemplater();
  doc.loadZip(zip);

  
  
  

  doc.setData({
    text: "my text, \n multiline",
    tour_Path_1: sTourPath_1,
    tour_Path_2: sTourPath_2
  });
  doc.setOptions({ linebreaks: true });
  doc.render();

  var buf = doc.getZip().generate({ type: 'nodebuffer' });
  fs.writeFileSync(path.resolve(__dirname + '../../../documents', 'output.docx'), buf);

  res.setHeader('content-type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');


  res.sendFile(path.join(__dirname + '../../../documents', 'output.docx'));
});


module.exports = router;
