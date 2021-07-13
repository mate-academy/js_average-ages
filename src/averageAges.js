'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const reducer = (a, b) => a + b;
  const averageAge = () => {
    const arrPeople = people.filter((person) => {
      return person.sex === 'm';
    });
    const arrAges = arrPeople.map(person => person.died - person.born);

    return arrAges.reduce(reducer) / arrAges.length;
  };

  const averageAgeСentury = () => {
    const arrPeopleC = people.filter((person) => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    });
    const arrAgesCentury = arrPeopleC.map(person => person.died - person.born);

    return arrAgesCentury.reduce(reducer) / arrAgesCentury.length;
  };

  const resultAverageAge = century ? averageAgeСentury() : averageAge();

  return +resultAverageAge.toFixed(2);

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const reducer = (a, b) => a + b;
  const arrWomen = people.filter((person) => {
    return person.sex === 'f';
  });

  const averageAgeW = () => {
    const arrAges = arrWomen.map(person => person.died - person.born);

    return arrAges.reduce(reducer) / arrAges.length;
  };

  const averageAgeMothers = () => {
    const arrMothers = arrWomen.filter((person) => {
      return people.some((female) => {
        return female.mother === person.name;
      });
    });
    const arrAgesMothers = arrMothers.map(person => person.died - person.born);

    return arrAgesMothers.reduce(reducer) / arrAgesMothers.length;
  };

  const resultAverageAge = withChildren ? averageAgeMothers() : averageAgeW();

  return +resultAverageAge.toFixed(2);
};

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const reducer = (a, b) => a + b;
  const arrMothers = people.filter((person) => {
    return people.some((man) => {
      return man.mother === person.name;
    });
  });

  const averageAgeMothers = () => {
    const yearsDiff = [];

    arrMothers.forEach((mother) => {
      people.forEach((person) => {
        if (person.mother === mother.name) {
          yearsDiff.push(person.born - mother.born);
        };
      });
    });

    const resultYearsDiff = yearsDiff.reduce(reducer) / yearsDiff.length;

    return +resultYearsDiff.toFixed(2);
  };
  const averageAgeWithSon = () => {
    const diffWithSon = [];
    const mothersWithSon = arrMothers.filter((mother) => {
      return people.some((person) => {
        return person.sex === 'm' && person.mother === mother.name;
      });
    });

    mothersWithSon.forEach((mother) => {
      people.forEach((person) => {
        if (person.sex === 'm' && person.mother === mother.name) {
          diffWithSon.push(person.born - mother.born);
        };
      });
    });

    const resultYearsDiff = diffWithSon.reduce(reducer) / diffWithSon.length;

    return +resultYearsDiff.toFixed(2);
  };

  const AverageAge = onlyWithSon ? averageAgeWithSon() : averageAgeMothers();

  return AverageAge;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
