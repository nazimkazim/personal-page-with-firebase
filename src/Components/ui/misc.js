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

export const validate = element => {
  let error = [true, ''];
  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'this field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};
