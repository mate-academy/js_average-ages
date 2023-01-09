'use strict';

function getAges(people) {
  return people.map((human) => human.died - human.born);
}

function getAverage(nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function calculateMenAverageAge(people, century) {
  const forMen = people
    .filter(human => human.sex === 'm')
    .filter(human => !century || century === Math.ceil(human.died / 100));
  const ages = getAges(forMen);

  return getAverage(ages);
}

function calculateWomenAverageAge(people, withChildren) {
  const mothers = people
    .map(human => human.mother)
    .filter(name => name !== null);

  const forWomen = people
    .filter((human) => human.sex === 'f')
    .filter((human) => !withChildren || mothers.includes(human.name));
  const ages = getAges(forWomen);

  return getAverage(ages);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const forChildren = people.filter((child) =>
    onlyWithSon
      ? people.find(
        (human) => child.mother === human.name && child.sex === 'm'
      )
      : people.find((human) => child.mother === human.name)
  );

  const differenceInAge = forChildren
    .map(
      (child) =>
        child.born - people.find((mother) => mother.name === child.mother).born
    );
  const ages = getAverage(differenceInAge);

  return ages;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
