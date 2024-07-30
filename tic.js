const jeu = document.getElementById('jeu');
const cases = document.querySelectorAll('.case');
const boutonReinitialiser = document.getElementById('reinitialiser');
const RE=document.getElementById("RE")
const RT=document.getElementById("RT")

let joueurActuel = 'X';
let plateau = ['', '', '', '', '', '', '', '', ''];
let jeuTerminé = false;  
alert("Ce jeux est fait pour jouer à deux Merci!!")
const combinaisonsGagnantes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cases.forEach(cell => {
  cell.addEventListener('click', gererClicCase);
});

boutonReinitialiser.addEventListener('click', reinitialiserJeu);

function gererClicCase(event) {
  const index = event.target.dataset.index;

  if (plateau[index] !== '' || jeuTerminé) {
    return;
  }

  plateau[index] = joueurActuel;
  event.target.textContent = joueurActuel;

  if (verifierVainqueur()) {
    const t=`${joueurActuel} gagne !`;
    RT.textContent=t;
    RE.style.display='inline-block';
    jeu.style.filter='blur(1.5rem)';
    RT.style.color='green'
    jeuTerminé = true;
  } else if (plateau.every(cell => cell !== '')) {
    const t=`Match nul!`;
    RT.textContent=t;
    jeu.style.filter='blur(1.5rem)';
    RT.style.color='Black'
    RE.style.display='inline-block';
    jeuTerminé = true;
  } else {
    joueurActuel = joueurActuel === 'X' ? 'O' : 'X';
  }
}

function verifierVainqueur() {
  for (let i = 0; i < combinaisonsGagnantes.length; i++) {
    const combinaison = combinaisonsGagnantes[i];
    let gagnant = true;

    for (let j = 0; j < combinaison.length; j++) {
      const index = combinaison[j];
      if (plateau[index] !== joueurActuel) {
        gagnant = false;
        break;
      }
    }

    if (gagnant) {
      return true;
    }
  }

  return false;
}

function reinitialiserJeu() {
  jeu.style.filter='blur(0)';
  RT.innerHTML='';
  RE.style.display='none';
  plateau = ['', '', '', '', '', '', '', '', ''];
  cases.forEach(cell => cell.textContent = '');
  joueurActuel = 'X';
  jeuTerminé = false;
}
