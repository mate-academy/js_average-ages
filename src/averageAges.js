'use strict';

const FEMALE_GENDER = 'f';
const MALE_GENDER = 'm';

function calculateMenAverageAge(people, century) {
  const onlyMen = genderFilter(people, MALE_GENDER);

  const filteredMen = century
    ? onlyMen.filter(({ died }) => Math.ceil(died / 100) === century)
    : onlyMen;

  return calculateAvgAge(filteredMen);
}

function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = genderFilter(people, FEMALE_GENDER);

  const filteredWomen = withChildren
    ? onlyWomen.filter(({ name }) =>
      people.some(({ mother }) => mother === name))
    : onlyWomen;

  return calculateAvgAge(filteredWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filteredChildren = people.filter(({ mother, sex }) => (onlyWithSon)
    ? people.find(({ name }) => name === mother && sex === MALE_GENDER)
    : people.find(({ name }) => name === mother)
  );

  const ageDiff = filteredChildren.map(({ born, mother }) =>
    born - people.find(({ name }) => name === mother).born);

  return ageDiff.reduce((acc, age) => acc + age) / ageDiff.length;
}

function calculateAvgAge(people) {
  return people.reduce((acc, { died, born }) => (
    acc + (died - born)
  ), 0) / people.length;
}

function genderFilter(people, gender) {
  return people.filter(({ sex }) => sex === gender);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
