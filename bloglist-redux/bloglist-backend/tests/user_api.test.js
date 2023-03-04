const bcrypt = require('bcrypt')
const { application } = require('express')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash: passwordHash})

        await user.save()
    }, 1000000)

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'vitorbalestro',
            name: 'Vitor Balestro',
            password: '123456'
        }

        await api 
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(user => user.username)
            expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode message if username already in use', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'password'
        }
        
        const result = await api 
                            .post('/api/users')
                            .send(newUser)
                            .expect(400)
                            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
    
})

describe('creating new users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash: passwordHash})
    
        await user.save()
}, 1000000)

    test('status 400 when the password has less than 3 characters', async () => {
        const newUser = {
            username: 'InvalidPassword',
            name: 'somename',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
        const users = await helper.usersInDb()

        const usernames = users.map(user => user.username)
        expect(usernames).not.toContain('InvalidPassword')

    })

    test('status 400 if username is not informed', async () => {
        const newUser = {
            name: 'somename',
            password: '123456'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
        
})