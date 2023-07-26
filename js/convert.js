
let bbubtn = document.getElementById('bbu');
let poundbtn = document.getElementById('pound');

bbubtn.addEventListener('click', function(){
  let input = document.getElementById('input').value;
  document.getElementById('output').value = input / 11 + " Bae Bae Units"
})

poundbtn.addEventListener('click', function(){
    let input = document.getElementById('input').value;
    document.getElementById('output').value = input * 11 + " pounds"
})