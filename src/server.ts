
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { UserResolver } from './graphql/resolvers/UserResolver'
import { TaskResolver } from './graphql/resolvers/TaskResolver'

async function bootstrap(){
    const app = express()

    const schema = await buildSchema({
        resolvers: [UserResolver , TaskResolver]
    })

    const server = new ApolloServer({schema})

    server.applyMiddleware({app})

    const PORT = process.env.PORT || 4000;

    app.listen(PORT , () => {
        console.log(`Server started on http://localhost:${PORT}/graphql`)
    })
}

bootstrap().catch((error) => {
    console.error(error)
})