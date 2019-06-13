export const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export const reverseArray = actualArr => {
  let reversedArray = [];

  for (let i = actualArr.length - 1; i >= 0; i--) {
    reversedArray.push(actualArr[i]);
  }

  return reversedArray;
};

export const descOrder = actualArr => {
  actualArr.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.year_finish) - new Date(a.year_finish);
  });

  console.log(actualArr);

  return actualArr;
};

export const validate = element => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};
