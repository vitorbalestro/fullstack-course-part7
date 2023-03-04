import axios from 'axios'
import { useSelector } from 'react-redux'

const baseUrl = '/api/blogs'

const user = useSelector(state => state.user)

const token = `Bearer ${user.token}`

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, deleteBlog }