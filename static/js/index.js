const currentDate = new Date();
var age = currentDate - new Date('2004-09-06');

document.getElementById('ageIntro').innerHTML = document.getElementById('ageIntro').innerHTML.replace('XXX', Math.floor(age / 31556952000));