'use strict';

function calculateMenAverageAge(people, century) {
  let men = people.filter(person => person.sex === 'm');

  men = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const sumOfAgeMan = calculateSumOfAvarageAge(men);
  const averageAgeOfMen = calculateAverage(sumOfAgeMan, men.length);

  return averageAgeOfMen;
}

function calculateWomenAverageAge(people, withChildren) {
  let women = withChildren
    ? people.filter(person => person.mother !== null).map(el => el.mother)
    : people.filter(person => person.sex === 'f');

  women = withChildren
    ? people.filter(el => women.includes(el.name))
    : women;

  const sumOfAgeWoman = calculateSumOfAvarageAge(women);
  const averageAgeOfWomen = calculateAverage(sumOfAgeWoman, women.length);

  return averageAgeOfWomen;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let mothersWithChildren = [];
  let peopleCopy = people;

  peopleCopy = onlyWithSon
    ? peopleCopy.filter(person => person.sex === 'm')
    : peopleCopy;

  mothersWithChildren = peopleCopy.map(person => {
    const { mother, born } = person;

    const motherInfo = {};

    if (mother !== null) {
      motherInfo['name'] = mother;
      motherInfo['birthOfChild'] = born;
    }

    return motherInfo;
  });

  mothersWithChildren = mothersWithChildren.map(mother => {
    const findedMother = people.find(person => person.name === mother.name);

    if (findedMother !== undefined) {
      mother['age'] = mother.birthOfChild - findedMother.born;
    }

    return mother;
  });

  mothersWithChildren = mothersWithChildren.filter(
    person => person.hasOwnProperty('age'));

  const sumOfAge = mothersWithChildren.reduce(
    (sum, person) => sum + person.age, 0);
  const averageAgeDiff = calculateAverage(sumOfAge, mothersWithChildren.length);

  return averageAgeDiff;
}

function calculateAverage(sumOfAge, count) {
  return Math.round((sumOfAge / count) * 100) / 100;
}

function calculateSumOfAvarageAge(sex) {
  return sex.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
