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
  let males;

  if (century !== undefined) {
    males = people.filter(person => {
      if (
        person.sex === 'm' && Math.ceil(person.died / 100) === century
      ) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    males = people.filter(person => person.sex === 'm');
  }

  const age = males.reduce((sum, cur) => sum + (cur.died - cur.born), 0);

  return age / males.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let females;

  if (withChildren !== undefined) {
    females = people.filter(person => {
      if (
        person.sex === 'f' && people.some(man => man.mother === person.name)
      ) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    females = people.filter(person => person.sex === 'f');
  }

  const age = females.reduce((sum, cur) => sum + (cur.died - cur.born), 0);

  return age / females.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let female;
  const ageGap = [];

  if (onlyWithSon !== undefined) {
    female = people.filter(person => {
      if (
        person.sex === 'f' && people.some(man => {
          return man.mother === person.name && man.sex === 'm';
        })
      ) {
        return true;
      } else {
        return false;
      }
    });

    female.map(mother => {
      const children = people.filter(man => {
        return man.mother === mother.name;
      });

      children.map(child => {
        if (child.sex === 'm') {
          ageGap.push(child.born - mother.born);
        }
      });
    });
  } else {
    female = people.filter(person => {
      if (
        person.sex === 'f' && people.some(man => man.mother === person.name)
      ) {
        return true;
      } else {
        return false;
      }
    });

    female.map(mother => {
      const children = people.filter(man => {
        return man.mother === mother.name;
      });

      children.map(child => {
        ageGap.push(child.born - mother.born);
      });
    });
  };

  return (ageGap.reduce((sum, age) => sum + age)) / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
