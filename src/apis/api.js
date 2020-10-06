import axios from 'axios'

export default {
   tags(url = "/api/tags") {
      return {
         getOne: ({id}) => axios.get(`${url}/${id}`),
         getAll: () => axios.get(url),
         update: (toUpdate, id) => axios.put(`${url}/${id}`, toUpdate),
         create: (toCreate) => axios.post(url, toCreate),
         delete: (id) => axios.delete(`${url}/${id}`)
      }
   },

   notes(url = "/api/notes") {
      return {
         getOne: (id) => axios.get(`${url}/${id}`),
         getAll: () => axios.get(url),
         update: (toUpdate, id) => axios.put(`${url}/${id}`, toUpdate),
         create: (toCreate) => axios.post(url, toCreate),
         delete: (id) => axios.delete(`${url}/${id}`),
         getByTagId: (id) => axios.get(`/api/tags/${id}/notes`),
      }
   }
}