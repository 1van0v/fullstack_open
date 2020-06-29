import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:3001/persons';

function getPersons() {
  return axios.get(baseUrl).then((response) => response.data);
}

function addPerson(person) {
  return axios.post(baseUrl, person).then((response) => response.data);
}

function deletePerson({ id }) {
  return axios.delete(`${baseUrl}/${id}`);
}

function updateNumber(id, person) {
  return axios.put(`${baseUrl}/${id}`, person);
}

export default { getPersons, addPerson, deletePerson, updateNumber };
