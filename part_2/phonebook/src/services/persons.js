import axios from 'axios';

const baseUrl = 'http://127.0.0.1:3001/persons';

function getPersons() {
  return axios.get(baseUrl).then((response) => response.data);
}

function addPerson(person) {
  return axios.post(baseUrl, person).then((response) => response.data);
}

function deletePerson({ id }) {
  return axios.delete(`${baseUrl}/${id}`);
}

export default { getPersons, addPerson, deletePerson };
