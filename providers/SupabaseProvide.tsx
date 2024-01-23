"use client"

import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import React, { useState } from "react"


interface SupabseProviderProps{
    children : React.ReactNode
}

const SupabseProvider: React.FC<SupabseProviderProps> = ({children}) => {
    const   [supabaseClient] = useState(()=> createClientComponentClient<Database>())

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SupabseProvider