'use client'

import EmptyState from "../components/EmptyState";
import clsx from "clsx"
import useConversation from "../hooks/useConversation";

const Home = () => {
    const { isOpen } = useConversation();

    return (
        <div className={clsx(
            "lg:pc-80 h-full lg:block",
            isOpen ? 'block' : 'hidden'
        )}>
            <EmptyState />
        </div>
    )
}

export default Home;