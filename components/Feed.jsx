'use client';
import { useState, useEffect, useInsertionEffect } from "react"
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
    console.log('data: ', data)
    return (
        <div className="mt-16 prompt_layout">
            {data?.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick} />
            ))}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])
    const handleSearchChange = (e) => {

    }

    // Fetch all posts
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json();
            setPosts(data)
        }
        fetchPosts()
    }, [])

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a user name"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer" />
            </form>
            <PromptCardList
                data={posts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed