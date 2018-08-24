class cContract {
  constructor(
    cNumber,
    cDate
  ) {
    this.cNumber = cNumber,
    this.cDate = cDate
  }
}

class cClient {
  constructor(
    Surname,
    Name,
    Patronymic,
    DateOfBirth,
    rSerie,
    rNumber,
    rDate,
    rWho,
    rCode,
    rAddress,
    Phone
  ) {
    this.Surname = Surname,
    this.Name = Name,
    this.Patronymic = Patronymic,
    this.DateOfBirth = DateOfBirth,
    this.rSerie = rSerie,
    this.rNumber = rNumber,
    this.rDate = rDate,
    this.rWho = rWho,
    this.rCode = rCode,
    this.rAddress = rAddress,
    this.Phone = Phone
    }
}

class cTourist {
  constructor(
    Surname,
    Name,
    Patronymic,
    DateOfBirth,
    zSerie,
    zNumber
  ) {
    this.Surname = Surname,
    this.Name = Name,
    this.Patronymic = Patronymic,
    this.DateOfBirth = DateOfBirth,
    this.zSerie = zSerie,
    this.zNumber = zNumber
  }

  get fullName() {
    return this.Surname + ' ' + this.Name + ' ' + this.Patronymic
  }
  get passport() {
    return this.zSerie + ' ' + this.zNumber
  }
}

class cTour {
  constructor(
    TourOperator,
    Departure,
    Arrival,
    Return,
    Start,
    End,
    Lasting,
    Hotel,
    Placement,
    Food,
    Shipping,
    Transfer,
    Excursion,
    Visa,
    DateVisa,
    MedicalInsurance,
    TravelInsurance,
    NumberSum,
    StringSum
  ) {
    this.TourOperator = TourOperator;
    this.Departure = Departure;
    this.Arrival = Arrival;
    this.Return = Return;
    this.Start = Start;
    this.End = End;
    this.Lasting = Lasting;
    this.Hotel = Hotel;
    this.Placement = Placement;
    this.Food = Food;
    this.Shipping = Shipping;
    this.Transfer = Transfer;
    this.Excursion = Excursion;
    this.Visa = Visa;
    this.DateVisa = DateVisa;
    this.MedicalInsurance = MedicalInsurance;
    this.TravelInsurance = TravelInsurance;
    this.NumberSum = NumberSum;
    this.StringSum = StringSum;
  }
}

// Initilisation 
var aTourist = [];
var oContract = {};
var oClient = {};
var oTour = {};

// Contract - Create
var createContract = (cNumber, cDate) => {
  var ocontract = new cContract(cNumber, cDate);
  oContract = ocontract;
}

// Client - Create
var createClient = (Surname, Name, Patronymic, DateOfBirth, rSerie,
  rNumber, rDate, rWho, rCode, rAddress, Phone) => {
  var oclient = new cClient(Surname, Name, Patronymic, DateOfBirth, rSerie,
    rNumber, rDate, rWho, rCode, rAddress, Phone);
  oClient = oclient;
}

// Tourist - Create 
var createTourist = (Surname, Name, Patronymic, DateOfBirth, zSerie, zNumber) => {
  var otourist = new cTourist(Surname, Name, Patronymic, DateOfBirth, zSerie, zNumber);
  aTourist.push(otourist);
}

// Tourist - Remove
var deleteTourist = (id) => {
  aTourist.splice(id, 1);
}

// Tourist - Change
var changeTourist = (id, otourist) => {
  aTourist[id] = otourist;
}

// Tourist - View
var viewTourist = (id) => {
  return aTourist[id];
}


// Tour - Create
var createTour = (TourOperator, Departure, Arrival, Return, Start, End, Lasting, Hotel, Placement, Food, Shipping, Transfer, Excursion,
  Visa, DateVisa, MedicalInsurance, TravelInsurance, NumberSum, StringSum) => {
  
  var otour = new cTour(TourOperator, Departure, Arrival, Return, Start, End, Lasting, Hotel, Placement, Food, Shipping, Transfer, Excursion,
  Visa, DateVisa, MedicalInsurance, TravelInsurance, NumberSum, StringSum);
  
  oTour = otour;
}


