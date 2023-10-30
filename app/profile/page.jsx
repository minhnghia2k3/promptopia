"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Profile from "@/components/Profile"
const MyProfile = () => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter();
    useEffect(() => {
        // Fetch data
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();
            setPosts(data)
        }
        if (session?.user.id) fetchPosts();

    }, [session])

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
            name="MY"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />
    )
}

export default MyProfile