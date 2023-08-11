'use strict';

const FEMALE = 'f';
const MALE = 'm';

function sumAges(cadaver) {
  return cadaver.reduce((accum, person) =>
    (accum + (person['died'] - person['born'])), 0) / cadaver.length;
};

function getAgeDiff(cadaverChildren, cadaver) {
  return ((cadaverChildren.reduce((accum, child) =>
    accum + child['born'] - cadaver.find(mom => child['mother']
      === mom['name'])['born'], 0)) / cadaverChildren.length).toFixed(2);
};

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(person => person['sex'] === MALE);

  const cadaversMen = century
    ? allMen.filter(cadaver => Math.ceil(cadaver['died'] / 100) === century)
    : allMen;

  return sumAges(cadaversMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(person => person['sex'] === FEMALE);

  const cadaversWomen = withChildren
    ? allWomen.filter(woman => {
      return people.some(person => woman['name'] === person['mother']);
    })
    : allWomen;

  // moms = withChildren
  //   ? allWomen.filter(woman => {
  //     return people.some(person => woman['name'] === person['mother']);
  //   })
  //   : false;

  // return moms
  //   ? sumAges(moms) / moms.length
  //   : sumAges(allWomen) / allWomen.length;

  return sumAges(cadaversWomen);
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
