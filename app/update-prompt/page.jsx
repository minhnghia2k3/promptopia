'use client';
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@/components/Form";
const EditPrompt = () => {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })
    const handleEditPrompt = async (e) => {
        e.preventDefault(); // prevent reload
        setSubmitting(true);
        if (!promptId) alert('Prompt Id is missing')
        try {
            const res = await fetch(`/api/prompt/${promptId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                })
            if (res.ok) {
                router.push('/')
            }
        } catch (err) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }

    }
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        }
        if (promptId) getPromptDetails();
    }, [promptId])
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleEditPrompt}
        />
    )
}

export default EditPrompt