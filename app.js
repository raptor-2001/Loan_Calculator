//Event Listner
document.getElementById('loan-form').addEventListener('submit',callCalculate);

const loader = document.getElementById('loader');
const results = document.getElementById('results');


function callCalculate(e){

   setTimeout(calculate,3000);
   displayLoader();
   e.preventDefault();
}

// to display loader
function displayLoader(){
  loader.style.display="block";
  const results = document.getElementById('results');
  results.style.display = "none";
  setTimeout(loaderKill,3000);

  return;
}
// to kill the loader
function loaderKill(){
  loader.style.display="none";
  return;
}
//calculate function

function calculate(){
  results.style.display = "block";

  //input variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  //output variables
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  //formula variables
  const principle = parseFloat(amount.value);
  const calculatedInterest  = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //output setters
  const x = Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly = (x*calculatedInterest*principle)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value  = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
  }else{
    showError("Please Check Your Numbers");
  }

 
}

function showError(error){

  loader.style.display="none";
  results.style.display="none";
  //creating the error Box
  const errorBox = document.createElement('div');
  errorBox.className = "alert alert-danger";
  errorBox.appendChild(document.createTextNode(error));
  
  //selecting the right elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  

  //setting error box to right position
  card.insertBefore(errorBox,heading);

  // to remove error after 2 s
  setTimeout(errorBoxKill,2000);
}


//to kill the error box 
function errorBoxKill(){
  document.querySelector('.alert').remove();
}


