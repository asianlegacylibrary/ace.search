import React from 'react'
import { Header } from './Header'
import Main from './Main'
import { Footer } from './Footer'

export default () => {
    return (
        <React.Fragment>
            <Header />
            <Main />
            <Footer />
        </React.Fragment>
    )
}

// Using Render props pattern
// but unsure about usefulness with GraphQL
// <UserData render={({ data }) => <UserList data={data} />} />
