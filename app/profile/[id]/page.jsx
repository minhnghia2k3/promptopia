"use client";
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Profile from "@/components/Profile"
const MyProfile = () => {
    // const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const [userName, setUserName] = useState('')
    const router = useRouter();
    const { id: userId } = useParams();
    useEffect(() => {
        // Fetch data
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json();
            setPosts(data)
        }
        if (userId) fetchPosts();
    }, [])

    useEffect(() => {
        if (posts) {
            const capitalizeName = posts[0]?.creator.username ?
                posts[0].creator.username[0].toUpperCase() + posts[0].creator.username.substring(1) :
                '';
            setUserName(capitalizeName)

        }
    }, [posts])


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
        const hasConfirm = confirm("Are you sure you want to delete this prompt?")
        if (hasConfirm) {
            try {
                await fetch(`api/prompt/${post._id.toString()}`, {
                    method: "DELETE"
                })
                const filteredPosts = posts.filter(p => p._id !== post._id) // Filter -> remove post

                setPosts(filteredPosts)
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName} personalized profile page`}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />
    )
}

export default MyProfile