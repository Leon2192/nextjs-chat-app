'use client'

import EmptyState from '../components/EmptyState'
import React from 'react'
import { signOut } from 'next-auth/react'

const Users = () => {
    return (
        <div className='hidden lg:block lg:pl-80 h-full'>
            <EmptyState />
        </div>

    )
}

export default Users;