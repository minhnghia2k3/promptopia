'use client';
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
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
    const [searchTimeout, setSearchTimeout] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [posts, setPosts] = useState([])
    // Tra ve ket qua khop voi chuoi tim kiem
    const filteredItems = (searchText) => {
        const regex = new RegExp(searchText, "i"); // Khong phan biet chu hoa, chu thuong
        return posts.filter(item =>
            regex.test(item?.creator.username) ||
            regex.test(item?.prompt) ||
            regex.test(item?.tag))
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        // debounce method
        setSearchTimeout(() => {
            setTimeout(() => {
                const searchResult = filteredItems(searchText)
                setSearchResults(searchResult)
            }, 500)
        })
    }
    const handleTagClick = (tag) => {
        setSearchText(tag);
        const searchResult = filteredItems(tag)
        setSearchResults(searchResult)
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
            <form onSubmit={(e) => e.preventDefault()} className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a user name"
                    value={searchText}
                    onChange={(e) => handleSearchChange(e)}
                    required
                    className="search_input peer"
                />
            </form>
            {
                searchText ?
                    (
                        <PromptCardList
                            data={searchResults}
                            handleTagClick={handleTagClick}
                        />
                    ) :
                    (
                        <PromptCardList
                            data={posts}
                            handleTagClick={handleTagClick}
                        />
                    )
            }

        </section>
    )
}

export default Feed