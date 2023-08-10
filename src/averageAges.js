'use strict';

const FEMALE = 'f';
const MALE = 'm';

function sumAges(whos) {
  return whos.reduce((accum, person) =>
    (accum + (person['died'] - person['born'])), 0);
};

function getAgeDiff(whosChildren, whos) {
  return ((whosChildren.reduce((accum, child) =>
    accum + child['born'] - whos.find(mom => child['mother']
      === mom['name'])['born'], 0)) / whosChildren.length).toFixed(2);
};

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(person => person['sex'] === MALE);

  const centuryCadaversMen = century
    ? allMen.filter(cadaver => Math.ceil(cadaver['died'] / 100) === century)
    : false;

  return centuryCadaversMen
    ? sumAges(centuryCadaversMen) / centuryCadaversMen.length
    : sumAges(allMen) / allMen.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(person => person['sex'] === FEMALE);

  const moms = withChildren
    ? allWomen.filter(woman => {
      return people.some(person => woman['name'] === person['mother']);
    })
    : false;

  return moms
    ? sumAges(moms) / moms.length
    : sumAges(allWomen) / allWomen.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => {
    return people.some((mother) => {
      return child['mother'] === mother['name'];
    });
  });

  const sons = children.filter(child => child['sex'] === MALE);

  return onlyWithSon
    ? +getAgeDiff(sons, people)
    : +getAgeDiff(children, people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
