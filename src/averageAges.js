'use strict';

function calculateMenAverageAge(people, century) {
  const arrayMen = people.filter(item => item.sex === 'm');

  const arrayAge = arrayMen.map(item => {
    const age = item.died - item.born;

    return age;
  });

  const sumaResult = arrayAge.reduce((acc, current) => {
    return acc + current;
  }, 0);

  const ageWithCentury = [...arrayMen].filter(item => {
    const centuryDied = Math.ceil(item.died / 100);

    return century === centuryDied;
  });

  const sumAgeWithCentury = ageWithCentury.reduce((acc, current) => {
    const age = current.died - current.born;

    return acc + age;
  }, 0);

  const averageAge = sumaResult / arrayMen.length;
  const averageAgeCentury = sumAgeWithCentury / ageWithCentury.length;

  const result = century ? averageAgeCentury : averageAge;

  return result;
}

function calculateWomenAverageAge(people, withChildren) {
  const arrayWomens = people.filter(item => item.sex === 'f');

  const ageAllWomens = arrayWomens.map(item => item.died - item.born);
  const sumAgeAllWomens = ageAllWomens.reduce(
    (acc, current) => acc + current, 0);
  const averageAgeAllWomens = sumAgeAllWomens / arrayWomens.length;

  const arrPeopleMother = people.map(item => item.mother);
  const arrayWomensWithChild = arrayWomens.filter(
    item => arrPeopleMother.includes(item.name));
  const ageWomensWithChild = arrayWomensWithChild.map(
    item => item.died - item.born);
  const sumAgeWomenWithChild = ageWomensWithChild.reduce(
    (acum, item) => acum + item, 0);
  const averageAgeWomensWithChild = sumAgeWomenWithChild
  / arrayWomensWithChild.length;

  const result = withChildren ? averageAgeWomensWithChild : averageAgeAllWomens;

  return result;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const arrNamePeople = people.map(item => {
    return item.name;
  });

  const arrPersWithMom = people.filter(item => {
    return (item.mother !== null && arrNamePeople.includes(item.mother));
  });

  const arrAgeDiff = arrPersWithMom.map(item => {
    const nameMother = item.mother;
    const itemMother = people.filter(el => {
      return el.name === nameMother;
    });
    const age = item.born - itemMother[0].born;

    return age;
  });

  const sumAgeDiff = arrAgeDiff.reduce((accum, item) => accum + item, 0);
  const averageAgeDiff = sumAgeDiff / arrAgeDiff.length;

  const arrSonWithMom = arrPersWithMom.filter(item => item.sex === 'm');
  const arrAgeDiffsSonMom = arrSonWithMom.map(item => {
    const nameMother = item.mother;
    const itemMother = people.filter(el => {
      return el.name === nameMother;
    });
    const age = item.born - itemMother[0].born;

    return age;
  });

  const sumAgeDiffSonMom = arrAgeDiffsSonMom.reduce((
    acc, item) => acc + item, 0);
  const averageAgeDiffSonMom = sumAgeDiffSonMom / arrAgeDiffsSonMom.length;
  const result = onlyWithSon ? averageAgeDiffSonMom : averageAgeDiff;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
